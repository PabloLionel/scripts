var list = [3, 4, 2, 6, 5, 1, 2, 9, 8]//[3, 4, 2, 6, 5, 7, 1, 9] //

//[[[[[[[[[[COMPLEJIDAD: (n log n) en una distribucion normal]]]]]]]]]]
const mergeSort = x => {
  const merge = (a, b) => {
    let c = []
    while (a.length != 0 && b.length != 0)
      c.push(a[0] < b[0] ? a.shift() : b.shift())
    return c.concat(!a.length ? b : a)
  }
  if (x.length == 0 || x.length == 1)
    return x
  else {
    let m = ~~(x.length / 2)
    return merge(mergeSort(x.slice(0, m)), mergeSort(x.slice(m)))
  }
}

// version prototipada de QuickSort.
// Array.prototype.quickSort = function () {
//   if (this.length < 2) return this
//   let pivot = this[Math.round(this.length / 2)]
//   return this.filter(x => x <  pivot)
//              .quickSort()
//              .concat(this.filter(x => x == pivot))
//              .concat(this.filter(x => x >  pivot).quickSort())
// }

const quickSort = x => {
  // Mas rapido que el optimizado en recursos de memoria
  if (x.length <= 1)
    return x
  else {
    let left = [],
      right = [],
      pivot = x.pop()
    for (let i = 0; i < x.length; i++)
      if (x[i] <= pivot)
        left.push(x[i])
      else
        right.push(x[i])
    return [].concat(quickSort(left), pivot, quickSort(right))
  }
}

const quickSortOptimized = (x, less = (a, b) => a < b) => {
  // optimized in resource.
  const swap = (i, j) => { [x[i], x[j]] = [x[j], x[i]] }
  const quicksort = (left, right) => {
    if (left < right) {
      let pivot = x[left + Math.floor((right - left) / 2)],
        left_new = left,
        right_new = right
      do {
        while (less(x[left_new], pivot))
          left_new++
        while (less(pivot, x[right_new]))
          right_new--
        if (left_new <= right_new) {
          swap(left_new, right_new);
          left_new++
          right_new--
        }
      } while (left_new <= right_new)
      quicksort(left, right_new)
      quicksort(left_new, right)
    }
  }
  quicksort(0, x.length - 1)
  return x
}

const heapSort = x => {
  const swap = (x, i, j) => { [x[i], x[j]] = [x[j], x[i]] }
  const heapify = x => {
    let i = x.length / 2 - 1
    i = Math.floor(i)
    while (i >= 0) {
      siftDown(x, i, x.length)
      i--
    }
  }
  const siftDown = (heap, i, max) => {
    let i_big, c1, c2
    while (i < max) {
      i_big = i
      c1 = 2 * i + 1
      c2 = c1 + 1
      if (c1 < max && heap[c1] > heap[i_big])
        i_big = c1
      if (c2 < max && heap[c2] > heap[i_big])
        i_big = c2
      if (i_big == i) return
      swap(heap, i, i_big)
      i = i_big
    }
  }
  heapify(x)
  let end = x.length - 1
  while (end > 0) {
    swap(x, 0, end)
    siftDown(x, 0, end)
    end--
  }
  return x
}

//[[[[[[[[[[COMPLEJIDAD: (n log^2 n) en una distribucion normal]]]]]]]]]]

const shellSort = x => {
  for (let h = x.length; h > 0; h = ~~(h / 2)) {
    for (let i = h; i < x.length; i++) {
      let k = x[i]
      for (var j = i; j >= h && k < x[j - h]; j -= h)
        x[j] = x[j - h]
      x[j] = k
    }
  }
  return x
}
const shellSortOptimizado = x => {
  let aux, interruptor
	intervalos = ~~(x.length / 2)
	while (intervalos>0){
		for (let i = intervalos; i < x.length; i++) {
			let j = i - intervalos
			aux = x[i]
			interruptor = false
			while (!interruptor && aux<x[j]) {
				x[j + intervalos] = x[j]
				if (j>=intervalos)
					j = j - intervalos
				else
					interruptor = true     
      }
			if (interruptor)
				x[j] = aux
			else 
				x[j + intervalos] = aux
    }
		intervalos = ~~(intervalos / 2)
  }
  return x
}
const shellSortIntervalos = x => {
	let intervalos = ~~((x.length*5) / 11)
	while (intervalos>0) {
		for (let i = intervalos; i < x.length; ++i) {
			let j = i,
			aux = x[i]
			while (j>=intervalos && aux<x[j-intervalos]) {
				x[j] = x[j-intervalos]
				j = j-intervalos
      }
			x[j] = aux
    }
		intervalos = ~~((intervalos*5) / 11)
		if (intervalos == 2) intervalos = 1
  }
  return x
}
const shellSortStevenPigeon = x => {
  const ln = Math.log // base e
	let intervalos = 0
	if (x.length>1) {
    h = Math.trunc(ln(x.length - 1) + 2)
    intervalos = Math.trunc(Math.exp(h - 2) + 1.5) // solo para 64Bits 
  }
	while (intervalos > 0) { 
		for (let i = intervalos; i < x.length; ++i) {
			let j = i,
			aux = x[i]
			while (j >= intervalos && aux < x[j - intervalos]) {
				x[j] = x[j - intervalos]
				j = j - intervalos
      }
			x[j] = aux
    }
		h--
		if (h > 0) 
			intervalos = Math.trunc(Math.exp(h - 2) + 1.5)
		else 
			intervalos = 0
  }
  return x
}

//[[[[[[[[[[COMPLEJIDAD: (n^2) en una distribucion normal]]]]]]]]]]

const bubbleSort = x => {
  let done = false
  while (!done) {
    done = true
    for (let i = 1; i < x.length; i++) 
      if (x[i - 1] > x[i]) {
        [x[i - 1], x[i]] = [x[i], x[i - 1]]
        done = false
      }
  }
  return x;
}

/**
 * Cocktail Sort (Shake Sort)
 * El tipo de coctelera es una mejora en el Bubble Sort. 
 * La mejora es básicamente que los valores "burbujean" 
 * en ambas direcciones a través de la matriz, porque en 
 * cada iteración la burbuja de clasificación de la 
 * coctelera se clasifica una vez hacia adelante y una 
 * hacia atrás.
 */
const cocktailSort = x => {
  let isSorted = true
  while (isSorted) {
    for (let i = 0; i < x.length - 1; i++) {
      if (x[i] > x[i + 1]) {
        [x[i], x[i + 1]] = [x[i + 1], x[i]]
        isSorted = true
      }
    }
    if (!isSorted) break
    isSorted = false
    for (let j = x.length - 1; j > 0; j--) {
      if (x[j - 1] > x[j]) {
        [x[i], x[i - 1]] = [x[i - 1], x[i]]
        isSorted = true
      }
    }
  }
  return x
}

const combSort = x => {
  let gap = x.length, j
  swaps = true
  while (gap > 1 || swaps) {
    gap = Math.max(1, parseInt(gap / 1.25)) // minimum gap is 1
    swaps = false
    for (let i = 0; i < x.length - gap; ++i) {
      j = i + gap
      if (x[i] > x[j]) {
        [x[i], x[j]] = [x[j], x[i]]
        swaps = true
      }
    }
  }
  return x
}

const genomeSort = x => {
  let i = 1, j = 2, size = x.length
  while (i < size)
    if (x[i - 1] <= x[i])
      [i, j] = [j, j + 1]
    else {
      [x[i - 1], x[i]] = [x[i], x[i - 1]]
      i--
      if (!i)
        [i, j] = [j, j + 1]
    }
  return x
}

const insertionSort = x => {
  for (let i = 0; i < x.length; ++i) {
    current = x[i]
    for (let j = i - 1; j > -1; --j)
      if (x[j] > current)
        [x[j], x[j + 1]] = [x[j + 1], x[j]]
      else {
        x[j + 1] = current
        break
      }
  }
  return x
}

const insertionSort2 = x => {
  let j
  for (let i = 1; i < x.length - 1; ++i) {
    value = x[i]
    j = i - 1
    while (j >= 0 && x[j] > value) {
      x[j + 1] = x[j]
      j--
    }
    x[j + 1] = value
  }
  return x
}

const selectionSort = x => {
  let minimum
  for (let i = 0; i < x.length - 1; ++i) {
    minimum = i
    for (let j = i + 1; j < x.length; ++j)
      if (x[j] < x[minimum])
        minimum = j
    if (minimum != i) [x[i], x[minimum]] = [x[minimum], x[i]]
  }
  return x
}

const doubleSelectionSort = x => { // me lo invente jeje
  const minmaxIndex = (x, start, end) => {
    let min = start, max = end
    for (let i = start; i <= end; ++i){
      if (x[min] >= x[i])
        min = i
      if (x[max] < x[i])
        max = i
    }
    return [min, max]
  }
  let i = 0, n = x.length, minmax, tmp
  while (i < n){
    n--
    minmax = minmaxIndex(x,i, n)
    if (i != minmax[0])
      [x[i], x[minmax[0]]] = [x[minmax[0]], x[i]]
    if (n != minmax[0])
      [x[minmax[1]], x[n]] = [x[n], x[minmax[1]]]
    i++
  }
  return x
}

const strandSort = x => {
  const merge = (a, b) => {
    let tmp = []
    while (a.length && b.length)
      tmp.push(a[0] < b[0] ? a.shift() : b.shift())
    return tmp.concat(a, b)
  }
  const strand = a => {
    let i = 0, s = [a.shift()]
    while (i < a.length)
      if (a[i] > s[s.length - 1]) {
        s.push(a[i])
        a.splice(i, 1)
      } else
        i++
    return s
  }
  let out = strand(x)
  while (x.length)
    out = merge(out, strand(x))
  return out
}

//[[[[[[[[[[Otros algoritmos de ordenacion]]]]]]]]]]

const countSort = x => {
  // solo para enteros pero es el mas rapido de todos los metodos.
  // un inconveniente es que no intercambia los valores, los sobreescribre.
  let i, z = 0, count = [], min = Math.min(...x), max = Math.max(...x)
  for (i = min; i <= max; i++)
    count[i] = 0
  for (i = 0; i < x.length; i++)
    count[x[i]]++
  for (i = min; i <= max; i++)
    while (count[i]-- > 0)
      x[z++] = i
  return x
}

const pigeonholeSort = x => { // Solo para naturales sub cero.
  console.assert(Math.min(...x) >= 0, "Todos los elementos deben ser enteros positivos.")
  let min = Math.min(...x), max = Math.max(...x), range = max - min + 1; // Find range 
  const zeros = size => {
    var tmp = []
    for (let i = 0; i < size; ++i)tmp[i] = [];
    return tmp
  }
  let holes = zeros(range)
  for (let i = 0; i < x.length; i++)
    holes[x[i] - min].push(x[i])
  return [].concat(...holes)
}

const radixSort = (x, base = 10) => {
  function __range__(left, right, inclusive) { // Utilidad: range de python
    let range = [], ascending = left < right, end = !inclusive ? right : ascending ? right++ : right--
    for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--)
      range.push(i)
    return range
  }
  const getDigit = (num, base, digit_num) => ~~(num / base ** digit_num) % base
  const makeBlanks = size => __range__(0, size, false).map(x => [])
  const logBase = (x, base) => Math.log10(x) / Math.log10(base)
  const maxAbs = (x, base) => parseInt(Math.round(logBase(Math.max.apply(null, x.map(Math.abs)), base)))
  const split = (x, base, position) => {
    let buckets = makeBlanks(base)
    x.forEach(n => {
      if (n < 0) // Cannot read property 'unshift' of undefined para mil elementos...investigar despues...
        buckets[x.length + getDigit(n, base, position)].unshift(n)
      else
        buckets[getDigit(n, base, position)].push(n)
    })
    return buckets
  }
  const merge = x => [].concat(...x)
  const splitBySign = x => {
    buckets = [[], []]
    for (n of x)
      if (n < 0)
        buckets[0].push(n)
      else
        buckets[1].push(n)
    return buckets
  }
  const passes = maxAbs(x, base)
  let out = x.slice()
  for (let position = 0; position < passes; ++position)
    out = merge(split(out, base, position))
  return merge(splitBySign(out))
}

const bucketSort = (x, base = 10) => {
  function __range__(left, right, inclusive) { // Utilidad: range de python
    let range = [], ascending = left < right, end = !inclusive ? right : ascending ? right++ : right--
    for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--)
      range.push(i)
    return range
  }
  const makeBlanks = size => __range__(0, size, false).map(x => [])
  // const makeBlanks = size => (new Array(size)).fill([])
  const merge = buckets => [].concat(...buckets)
  const getDigit = (num, base, digit_num) => ~~(num / base ** digit_num) % base
  const split = (x, base, position) => {
    let buckets = makeBlanks(base)
    x.forEach(n => buckets[getDigit(n, base, position)].push(n))
    return buckets
  }
  console.assert(Math.min(...x) >= 0, "Todos los elementos deben ser enteros positivos.")
  let buckets = split(x, base, 0)
  for (let i = 0; i < base; buckets[++i].sort())
    return merge(buckets)
}

const flashSort = x => {
  let max = 0, min = x[0],
    n = x.length,
    m = ~~(0.45 * n),
    l = new Array(m);
  for (let i = 1; i < n; ++i) {
    if (x[i] < min)
      min = x[i]
    if (x[i] > x[max])
      max = i
  }
  if (min === x[max]) return x
  let c1 = (m - 1) / (x[max] - min)
  for (let k = 0; k < m; k++)
    l[k] = 0
  for (let j = 0; j < n; ++j) {
    k = ~~(c1 * (x[j] - min))
    ++l[k]
  }
  for (let p = 1; p < m; ++p)
    l[p] = l[p] + l[p - 1]
  let hold = x[max];
  x[max] = x[0];
  x[0] = hold;
  //permutation
  let move = 0, t, flash, j = 0
  var k = m - 1
  while (move < (n - 1)) {
    while (j > (l[k] - 1)) {
      ++j
      k = ~~(c1 * (x[j] - min))
    }
    if (k < 0) break
    flash = x[j]
    while (j !== l[k]) {
      k = ~~(c1 * (flash - min))
      hold = x[t = --l[k]]
      x[t] = flash
      flash = hold
      ++move
    }
  }
  //insertion
  for (j = 1; j < n; j++) {
    hold = x[j]
    i = j - 1
    while (i >= 0 && x[i] > hold)
      x[i + 1] = x[i--]
    x[i + 1] = hold
  }
  return x
}

const pancakeSort = x => {
  const maxInIndexOf = (x, n) => {
    let index = 0, max = x[index]
    for (let i = 1; i < n; ++i)
      if (x[index] < x[i])
        index = i
    return index
  }
  for (let i = x.length - 1; i >= 1; i--) {
    // 1. find the index of the largest size in unsorted x
    // let maxIndex = x.indexOf(Math.max(...x.slice(0, i + 1)))
    let maxIndex = maxInIndexOf(x, i + 1)
    // 2. if the element is maxIndex, continue
    if (maxIndex == i) continue
    // 3. otherwise, flip the largest element to index 0
    let newSlice
    if (maxIndex > 0) {
      newSlice = x.slice(0, maxIndex + 1).reverse()
      for (let j = 0; j <= maxIndex; j++)
        x[j] = newSlice[j]
    }
    // 4. then flip the largest element to the sorted index
    newSlice = x.slice(0, i + 1).reverse()
    for (let j = 0; j <= i; j++)
      x[j] = newSlice[j]
  }
  return x
}

// Solo sirve para numeros enteros sub cero.
Array.prototype.sleepSort = function (callback) {
  const res = []
  this.forEach(n =>
    setTimeout(() => {
      res.push(n)
      if (this.length === res.length)
        callback(res)
    }, n)
  )
}// list.sleepSort(console.log)

// Permutation sort or Bogo Sort
// permuta hasta comprobar que el arreglo esta 
// ordenado (muy ineficiente, es decir es lento).
const permutationSort = a => {
  const find_matching_permutation = function (a, f_match) {
    const factorials = get_factorials(a.length)
    for (let i = 0, end = factorials[a.length], asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
      const permuted_array = permutation(a, i, factorials)
      if (f_match(permuted_array))
        return permuted_array
    }
    return null
  }
  const in_order = a => {
    if (a.length <= 1) return true
    for (let i = 0, end = a.length - 1, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--)
      if (a[i] > a[i + 1]) return false
    return true
  }
  const get_factorials = n => {
    const ans = [1]
    let f = 1
    for (let i = 1, end = n, asc = 1 <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
      f *= i
      ans.push(f)
    }
    return ans
  }
  const permutation = (a, i, factorials) =>
    (() => {
      const result = []
      while (a.length > 0) {
        const f = factorials[a.length - 1], n = Math.floor(i / f)
        i = i % f
        const elem = a[n]
        a = a.slice(0, n).concat(a.slice(n + 1))
        result.push(elem)
      }
      return result
    })()
  function __range__(left, right, inclusive) { // Utilidad: range de python
    let range = [], ascending = left < right, end = !inclusive ? right : ascending ? right++ : right--
    for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--)
      range.push(i)
    return range
  }
  const indexes = __range__(0, a.length, false);
  const ans = find_matching_permutation(indexes, function (permuted_indexes) {
    const new_array = (Array.from(permuted_indexes).map((i) => a[i]))
    return in_order(new_array)
  })
  return ((() => {
    const result = [];
    for (let i of Array.from(ans)) result.push(a[i])
    return result
  })())
}
const bogoSort = v => {
  const shuffle = v => {
    for (let j, x, i = v.length; i; j = Math.floor(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v
  }
  const isSorted = v => {
    for (let i = 1; i < v.length; i++)
      if (v[i - 1] > v[i]) return false
    return true
  }
  while (!isSorted(v))
    v = shuffle(v)
  return v
}

const stoogeSort = x => {
  const stooge = (x, i, j) => {
    if (x[j] < x[i])
      [x[i], x[j]] = [x[j], x[i]]
    if (j - i > 1) {
      let t = Math.floor((j - i + 1) / 3)
      stooge(x, i, j - t)
      stooge(x, i + t, j)
      stooge(x, i, j - t)
    }
  }
  stooge(x, 0, x.length - 1)
  return x
}
// Gravity Sort (Bead Sort)
const gravitySort = x => { // solo para naturales sub cero
  const zeros = size => {
    var tmp = []
    for (let i = 0; i < size - 1; tmp[++i] = 0);
    return tmp
  }
  console.assert(Math.min(...x) >= 0, "Todos los elementos deben ser enteros positivos.")
  let i, j, n = x.length, max = Math.max(...x)
  if (n < 2) return
  let beads = zeros(max * n)
  for (i = 0; i < n; ++i)
    for (j = 0; j < x[i]; beads[i * max + ++j] = 1)
      for (j = 0; j < max; ++j) {
        let sum = 0
        for (i = 0; i < n; ++i) {
          sum += beads[i * max + j]
          beads[i * max + j] = 0
        }
        for (i = n - sum; i < n; beads[i++ * max + j] = 1);
      }
  for (i = 0; i < n; ++i) {
    j = 0
    while (j < max && beads[i * max + ++j]);
    x[i] = j
  }
  return x
}

const treeSort = x => {
  const newNode = (item, left = null, right = null) => ({ key: item, left: left, right: right })
  const insert = (node, key) => {
    if (!node) return newNode(key)
    if (key < node.key)
      node.left = insert(node.left, key)
    else if (key > node.key)
      node.right = insert(node.right, key)
    else {
      let temp = node.right
      node.right = newNode(key, null, temp)
    }
    return node
  }
  const sort = root => {
    const helper = (node, fn) => {
      if (node) {
        helper(node.left, fn)
        fn(node.key)
        helper(node.right, fn)
      }
    }
    let temp = []
    helper(root, key => { temp.push(key) })
    return temp
  }
  let root = null
  for (let i = 0; i < x.length; ++i) root = insert(root, x[i])
  return sort(root)
}

const tagSort = (x, getKey) => {
  function __range__(left, right, inclusive) { // Utilidad: range de python
    let range = [], ascending = left < right, end = !inclusive ? right : ascending ? right++ : right--
    for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--)
      range.push(i)
    return range
  }
  let i, j, n = x.length, tag = __range__(0, n, false)
  for (i = 0; i < n; i++)
    for (j = i + 1; j < n; j++)
      if (getKey(x[tag[i]]) > getKey(x[tag[j]]))
        [tag[i], tag[j]] = [tag[j], tag[i]]
  return tag
} // tagSort(list, data => data).forEach(i => console.log(list[i]))

const timSort = x => {
  const RUN = 32; // 64 ... 2^n
  const insertionSort = (left, right) => {
    for (let i = left + 1; i <= right; i++) {
      let temp = x[i], j = i - 1
      while (x[j] > temp && j >= left) {
        x[j + 1] = x[j]
        j--
      }
      x[j + 1] = temp
    }
  }
  const zeros = n => (new Array(n)).fill(0)
  const merge = (l, m, r) => {
    let i, j, k, len1 = m - l + 1, len2 = r - m,
      left = zeros(len1), right = zeros(len2)
    for (i = 0; i < len1; i++)
      left[i] = x[l + i]
    for (i = 0; i < len2; i++)
      right[i] = x[m + 1 + i]
    i = 0
    j = 0
    k = l
    while (i < len1 && j < len2) {
      if (left[i] <= right[j]) {
        x[k] = left[i]
        i++
      } else {
        x[k] = right[j]
        j++
      }
      k++
    }
    while (i < len1) {
      x[k] = left[i]
      k++
      i++
    }
    while (j < len2) {
      x[k] = right[j]
      k++
      j++
    }
    return x
  }
  const n = x.length
  for (let i = 0; i < n; i += RUN)
    insertionSort(i, Math.min((i + 31), (n - 1)))
  for (let size = RUN; size < n; size = 2 * size)
    for (let left = 0; left < n; left += 2 * size) {
      let mid = left + size - 1,
        right = Math.min((left + 2 * size - 1), (n - 1))
      merge(left, mid, right)
    }
  return x
}

const bitonicSort = (x, up = true) => { // no funciona para dimenciones impares
  const bitonic_merge = (up, x) => {
    if (x.length == 1)
      return x
    else {
      bitonic_compare(up, x)
      let m = ~~(x.length / 2),
        first = bitonic_merge(up, x.slice(0, m)),
        second = bitonic_merge(up, x.slice(m))
      return [].concat(first, second)
    }
  }
  const bitonic_compare = (up, x) => {
    let dist = ~~(x.length / 2)
    for (let i = 0; i < dist; ++i)
      if ((x[i] > x[i + dist]) == up)
        [x[i], x[i + dist]] = [x[i + dist], x[i]]
  }
  if (x.length <= 1)
    return x
  else {
    let m = ~~(x.length / 2),
      first = bitonicSort(x.slice(0, m), true),
      second = bitonicSort(x.slice(m), false)
    return bitonic_merge(up, [].concat(first, second))
  }
}

const cycleSort = x => { //   let writes = 0
  for (cycleStart = 0; cycleStart < x.length - 1; ++cycleStart) {
    let item = x[cycleStart], pos = cycleStart
    for (let i = cycleStart + 1; i < x.length; ++i)
      if (x[i] < item)
        pos += 1
    if (pos == cycleStart) continue
    while (item == x[pos]) pos++
    let temp = x[pos]
    x[pos] = item
    x[pos] = temp // writes++
    while (pos != cycleStart) {
      pos = cycleStart
      for (let i = cycleStart + 1; i < x.length; ++i)
        if (x[i] < item)
          pos++
      while (item == x[pos])
        pos++
      temp = x[pos]
      x[pos] = item
      item = temp //   writes++
    }
  }
  return x//   return writes
}

const randInt = (min, max) => Math.floor(Math.random() * (max - min)) + min

const tmp = []
for (let i = 0; i < 1000; ++i) temp.push(randInt(-1000, 1000))

console.time("sort")
// method(tmp) ...
console.timeEnd("sort")

// https://en.wikipedia.org/wiki/Sorting_algorithm#Distribution_sort

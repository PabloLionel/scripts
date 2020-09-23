

// Busqueda lineal:
const search = (arr, x) => {
    for (let i = 0; i < arr.length; ++i)
        if (arr[i] == x)
            return i
    return -1
}

// Busqueda binaria:
const binarySearch = (arr, x, l = 0, r) => {
    if (!r) r = arr.length
    if (r >= l) {
        let mid = l + ~~((r - l) / 2)
        if (arr[mid] == x)
            return mid
        else if (arr[mid] > x)
            return binarySearch(arr, x, l, mid - 1)
        else
            return binarySearch(arr, x, mid + 1, r)
    } else
        return -1
}

const BinarySearchOptimized = (A, key, l = 0, r) => {
    if (!r) r = A.length
    let m
    while (r - l > 1) {
        m = l + ~~((r - l) / 2)
        if (A[m] <= key)
            l = m
        else
            r = m
    }
    if (A[l] == key)
        return l
    else
        return -1
}
// para arreglos ordenados
const jumpSearch = (arr, x, n) => {
    let step = Math.sqrt(n)
    let prev = 0
    while (arr[parseInt(Math.min(step, arr.length) - 1)] < x) {
        prev = step
        step += math.sqrt(arr.length)
        if (prev >= arr.length)
            return -1
    }
    while (arr[parseInt(prev)] < x) {
        prev += 1
        if (prev == Math.min(step, arr.length))
            return -1
    }
    if (arr[parseInt(prev)] == x)
        return prev
    return -1
}
// Dada una matriz ordenada de n valores distribuidos uniformemente
const interpolationSearch = (arr, x) => {
    let lo = 0
    let hi = (arr.length - 1)
    while (lo <= hi && x >= arr[lo] && x <= arr[hi]) {
        pos = lo + ~~((((hi - lo) /
            (arr[hi] - arr[lo])) * (x - arr[lo])))
        if (arr[pos] == x)
            return pos
        if (arr[pos] < x)
            lo = pos + 1
        else
            hi = pos - 1;
    }
    return -1
}
// Encontrar rango donde elemento está presente
// Haga la búsqueda binaria en el rango encontrado arriba.
const exponentialSearch = (arr, x) => {
    if (arr[0] == x)
        return 0
    let i = 1
    while (i < arr.length && arr[i] <= x)
        i = i * 2
    return binarySearch(arr, x, i / 2, Math.min(i, arr.length))
}


const findList = (first, second) => {
    let ptr1 = first, ptr2 = second
    if (first == null && second == null)
        return true
    if (first == null ||
        (first != null && second == null))
        return false
    while (second != null) {
        ptr2 = second
        while (ptr1 != null) {
            if (ptr2 == null)
                return false
            else if (ptr1.data == ptr2.data) {
                ptr1 = ptr1.next
                ptr2 = ptr2.next
            } else break
        }
        if (ptr1 == null)
            return true
        ptr1 = first
        second = second.next
    }
    return false
}

const newNode = (data = null, next = null) => ({ data: data, next: next })
/* Let us create two linked lists to test 
the above functions. Created lists shall be 
    a: 1->2->3->4 
    b: 1->2->1->2->3->4*/
// let a = newNode(1)
// a.next = newNode(2)
// a.next.next = newNode(3)
// a.next.next.next = newNode(4)

// let b = newNode(1)
// b.next = newNode(2)
// b.next.next = newNode(1)
// b.next.next.next = newNode(2)
// b.next.next.next.next = newNode(3)
// b.next.next.next.next.next = newNode(4)

// console.log(findList(a, b) ? "LIST FOUND" : "LIST NOT FOUND"); 

const fibMonaccianSearch = (arr, x) => {
    let fibMMm2 = 0, // # (m-2)'th Fibonacci No. 
        fibMMm1 = 1, // # (m-1)'th Fibonacci No. 
        fibM = fibMMm2 + fibMMm1 // # m'th Fibonacci 
    while (fibM < arr.length) {
        fibMMm2 = fibMMm1
        fibMMm1 = fibM
        fibM = fibMMm2 + fibMMm1
    }
    let offset = -1
    while (fibM > 1) {
        i = Math.min(offset + fibMMm2, arr.length - 1)
        if (arr[i] < x) {
            fibM = fibMMm1
            fibMMm1 = fibMMm2
            fibMMm2 = fibM - fibMMm1
            offset = i
        } else if (arr[i] > x) {
            fibM = fibMMm2
            fibMMm1 = fibMMm1 - fibMMm2
            fibMMm2 = fibM - fibMMm1
        } else
            return i
    }
    if (fibMMm1 && arr[offset + 1] == x)
        return offset + 1
    return -1
}

// busqueda recursiva:
const recSearch = (arr, x, l = 0, r) => {
    if (!r) r = arr.length
    if (r < l)
        return -1
    if (arr[l] == x)
        return l
    if (arr[r] == x)
        return r
    return recSearch(arr, x, l + 1, r - 1)
}

// no funciona

// const exactMatch = (text, pat) => { 
//     if (text == '\0' && pat != '\0') 
//         return false; 
//     // Else If last character of pattern reaches 
//     if (pat == '\0') 
//         return true; 
//     if (text == pat) 
//         return exactMatch(text + 1, pat + 1); 
//     return false; 
// } 
  
// // This function returns true if 'text' contain 'pat' 
// const contains = (text, pat) => { 
//     // If last character of text reaches 
//     if (text == '\0') 
//         return false; 
//     // If current characts of pat and text match 
//     if (text == pat) 
//         if(exactMatch(text, pat)) 
//             return 1; 
//         else
//           return contains(text + 1, pat); 
//     // If current characts of pat and tex don't match 
//     return contains(text + 1, pat); 
// } // https://www.geeksforgeeks.org/recursive-function-to-do-substring-search/
// console.log(contains("geeksforgeeks", "geeks"))
// console.log(contains("geeksforgeeks", "geeksquiz"))
// console.log(contains("geeksquizgeeks", "quiz"))
const files = [
  {
    id: '669376e4-e0a6-48b4-8863-989137b5016a',
    name: 'components',
    type: 'folder',
    children: [
      {
        id: '4833df5c-b1ed-4400-bcfe-8735d776880e',
        name: 'src',
        type: 'folder',
        children: [
          {
            id: '24861956-5e8b-4042-92aa-a7ef43c018bf',
            name: 'cdk',
            type: 'folder',
            children: [
              {
                id: 'c3d409fc-f882-4826-9ead-c482126eed22',
                name: 'package.json',
                type: 'file',
                html: '',
              },
              {
                id: 'b3f44e59-a58c-44a0-831b-c3c753651812',
                name: 'BUILD.bazel',
                type: 'file',
                html: '',
              },
            ],
          },
          {
            id: '9066dbab-0bf0-4d91-bbad-cda2d7d562af',
            name: 'material',
            type: 'file',
            html: '',
          },
        ],
      },
    ],
  },
  {
    id: '9619d96f-c642-439d-bea0-dbbe4a019ab1',
    name: 'angular',
    type: 'folder',
    children: [
      {
        id: '10bf20c8-4e72-4c1b-8e86-f670d03fb86b',
        name: 'packages',
        type: 'folder',
        children: [
          {
            id: 'a6ac3c4b-1155-443b-8b54-9b44a54714e1',
            name: '.travis.yml',
            type: 'file',
            html: '',
          },
          {
            id: 'b54e6740-d5bf-46b8-9190-8de7aa828a8c',
            name: 'firebase.json',
            type: 'file',
            html: '',
          },
        ],
      },
      {
        id: '22939e4e-0e2b-4291-b14b-b1421d324889',
        name: 'package.json',
        type: 'file',
        html: '',
      },
    ],
  },
  {
    id: 'fa2db10a-3560-416c-9b01-9e6d0a299b02',
    name: 'angularjs',
    type: 'folder',
    children: [
      {
        id: '3db86f47-71f4-4235-bbfe-5e3d0da09aac',
        name: 'gulpfile.js',
        type: 'file',
        html: '',
      },
      {
        id: '800eb0bc-7ca8-4f21-b8ee-3378d0cca81a',
        name: 'README.md',
        type: 'file',
        html: '',
      },
    ],
  },
];

const searchNode = (root, id) => {
  if (root && root.length !== 0) {
    for (const child of root) {
      if (child.id === id) {
        return [root, child];
      } else {
        const result = searchNode(child.children, id);
        if (result) {
          return result;
        }
      }
    }
  }
};

const searchNode2 = (root, _id) => {
  if (root && root.length !== 0) {
    const child = root.find(({ id }) => id === _id);
    if (child) {
      return [root, child];
    }
    for (const child of root) {
      const result = searchNode2(child.children, _id);
      if (result) {
        return result;
      }
    }
  }
};

console.log('searchNode#enRaiz');
measureExecutionTime(() =>
  searchNode(files, '9619d96f-c642-439d-bea0-dbbe4a019ab1')
);
console.log('searchNode#enHoja');
measureExecutionTime(() =>
  searchNode(files, 'b3f44e59-a58c-44a0-831b-c3c753651812')
);
console.log('searchNode2#enRaiz');
measureExecutionTime(() =>
  searchNode2(files, '9619d96f-c642-439d-bea0-dbbe4a019ab1')
);
console.log('searchNode2#enHoja');
measureExecutionTime(() =>
  searchNode2(files, 'b3f44e59-a58c-44a0-831b-c3c753651812')
);

/**
 *   <script src="lodash.min.js"></script>
 *   <script src="benchmark.js"></script>
 */
const suite = new Benchmark.Suite();

// add tests
suite
  .add('searchNode#enRaiz', function () {
    searchNode(files, '9619d96f-c642-439d-bea0-dbbe4a019ab1');
  })
  .add('searchNode#enHoja', function () {
    searchNode(files, 'b3f44e59-a58c-44a0-831b-c3c753651812');
  })
  .add('searchNode2#enRaiz', function () {
    searchNode2(files, '9619d96f-c642-439d-bea0-dbbe4a019ab1');
  })
  .add('searchNode2#enHoja', function () {
    searchNode2(files, 'b3f44e59-a58c-44a0-831b-c3c753651812');
  })
  // add listeners
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ async: true });

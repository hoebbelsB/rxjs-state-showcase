module.exports = {
  name: 'ngx-state',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ngx-state',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

'use strict';
module.exports = {
  get: () => {
    return Promise.resolve({
      data: [
        {
          "id": 1,
          "name": "Lowland - Children",
          "path": "lowland.mp3",
          "meta": {
            "length": 1234
          },
          "sourceUrl": "http://localhost:4000/songs/1/file",
        }
      ]
    });
  }
};
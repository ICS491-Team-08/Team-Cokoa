import React, { createRef } from 'react';

import { Meteor } from 'meteor/meteor';
// import { Button, Divider, Image, Transition } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class UploadImg extends React.Component {
  constructor(props) {
    super(props);
    this.imgTypeRef = createRef();
    this.buttonClick = this.buttonClick.bind(this);
  }

  componentDidMount() {
    const fileSelect = document.getElementById('fileSelect');
    const fileElem = document.getElementById('fileElem');
    const fileList = document.getElementById('fileList');

    fileSelect.addEventListener(
      'click',
      function (e) {
        if (fileElem) {
          fileElem.click();
        }
        e.preventDefault(); // prevent navigation to "#"
      },
      false,
    );

    fileElem.addEventListener(
      'change',
      handleFiles.bind(fileElem, Meteor.userId(), this.props.imgType),
      false,
    );

    async function handleFiles(id, ref) {
      if (!this.files.length) {
        fileList.innerHTML = '<p>No files selected!</p>';
      } else {
        fileList.innerHTML = '';
        const list = document.createElement('ul');
        fileList.appendChild(list);
        for (let i = 0; i < this.files.length; i++) {
          const li = document.createElement('li');
          list.appendChild(li);

          const img = document.createElement('img');
          img.src = URL.createObjectURL(this.files[i]);
          img.height = 60;
          img.onload = function () {
            URL.revokeObjectURL(this.src);
          };
          li.appendChild(img);
          const info = document.createElement('span');
          info.innerHTML =
            `${this.files[i].name}: ${this.files[i].size} bytes`;
          li.appendChild(info);
        }
        const temp = this.files[0].name.split('.');
        const type = `.${temp[temp.length - 1]}`;
        const file = new File([this.files[0]], id + type, {
          type: this.files[0].type,
        });
        // console.log(this.files[0]);
        ref.current = type;
        await fetch(
          'https://uj0flxl0te.execute-api.us-east-1.amazonaws.com/prod/s3',
          {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'getUriForPut',
              params: {
                fileName: file.name,
                fileType: file.type,
              },
            }),
          },
        )
          .then((res) => res.json())
          .then((url) => {
            fetch(url, {
              method: 'PUT', // *GET, POST, PUT, DELETE, etc
              headers: new Headers({
                'Content-Type': file.type,
                // 'Content-Type': 'application/x-www-form-urlencoded',
              }),
              body: file, // body data type must match "Content-Type" header
            });
          })
      }
    }
  }

  buttonClick(e) {
    e.preventDefault();
  }

  render() {
    return (
      <>
        <input
          type="file"
          id="fileElem"
          multiple
          accept="image/*"
          style={{ display: 'none' }}
          ref={this.inputRef}
        />
        <div>
          <button className="ui secondary basic button" id="fileSelect">
          Upload Event Image.
          </button>
        </div>
        <br/>
        <div id="fileList">No files selected!</div>
        <br/>
      </>
    );
  }
}

export default UploadImg;

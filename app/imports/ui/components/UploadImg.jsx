import React from "react";

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class UploadImg extends React.Component {
  componentDidMount() {
    const fileSelect = document.getElementById("fileSelect"),
      fileElem = document.getElementById("fileElem"),
      fileList = document.getElementById("fileList");

    fileSelect.addEventListener(
      "click",
      function (e) {
        if (fileElem) {
          fileElem.click();
        }
        e.preventDefault(); // prevent navigation to "#"
      },
      false
    );

    fileElem.addEventListener("change", handleFiles.bind(fileElem, this.props.imgRef), false);

    function handleFiles(imgRef) {
      if (!this.files.length) {
        fileList.innerHTML = "<p>No files selected!</p>";
      } else {
        fileList.innerHTML = "";
        const list = document.createElement("ul");
        fileList.appendChild(list);
        for (let i = 0; i < this.files.length; i++) {
          const li = document.createElement("li");
          list.appendChild(li);

          const img = document.createElement("img");
          img.src = URL.createObjectURL(this.files[i]);
          img.height = 60;
          img.onload = function () {
            URL.revokeObjectURL(this.src);
          };
          li.appendChild(img);
          const info = document.createElement("span");
          info.innerHTML =
            this.files[i].name + ": " + this.files[i].size + " bytes";
          li.appendChild(info);
	  imgRef.current = this.files[i];
        }
      }
    }
  }
  render() {
    return (
      <>
        <input
          type="file"
          id="fileElem"
          accept="image/*"
          style={{ display: "none" }}
        />
        <div className="fileInput">
        <button  class="ui large inverted red button"  href="#" id="fileSelect">
          Upload Event Image.
        </button>
        </div>
        <div id="fileList">
          <p>No file is selected!</p>
        </div>
      </>
    );
  }
}

export default UploadImg;

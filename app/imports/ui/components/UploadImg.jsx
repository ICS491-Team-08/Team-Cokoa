import React from "react";

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class UploadImg extends React.Component {
  componentDidMount() {
    const fileSelect = document.getElementById("fileSelect" + this.props.eventId),
      fileElem = document.getElementById("fileElem" + this.props.eventId),
      fileList = document.getElementById("fileList" + this.props.eventId);

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

    fileElem.addEventListener(
      "change",
      handleFiles.bind(fileElem, this.props.imgRef),
      false
    );

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
          id={"fileElem" + this.props.eventId}
          accept="image/*"
          style={{ display: "none" }}
        />
        <a class="ui large inverted red button" href="#" id={"fileSelect" + this.props.eventId}>
          {this.props.eventId ? "Add Vaccination Card" : "Upload Event Image"}
        </a>
        <div id={"fileList" + this.props.eventId}>
          <p>No file is selected!</p>
        </div>
      </>
    );
  }
}

export default UploadImg;

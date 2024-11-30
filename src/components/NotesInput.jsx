import React from "react";

class NotesInput extends React.Component {
  constructor(props) {
    super(props);

    // inisialisasi state
    this.state = {
      title: "",
      body: "",
      titleLimit: 50,
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const { value } = event.target;
    if (value.length <= this.state.titleLimit) {
      this.setState({ title: value });
    }
  }

  onBodyChangeEventHandler(event) {
    this.setState({ body: event.target.value });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    if (this.state.title.trim() === "" || this.state.body.trim() === "") {
      alert("Title dan body tidak boleh kosong!");
      return;
    }
    this.props.addNotes(this.state);
    this.setState({ title: "", body: "" });
  }

  render() {
    const { title, body, titleLimit } = this.state;
    const remainingCharacters = titleLimit - title.length;

    return (
      <div className="mb-16">
        <form
          className="w-full flex flex-col mx-auto shadow-xl p-12 rounded xl:w-1/2"
          onSubmit={this.onSubmitEventHandler}
        >
          <h1 className="font-bold text-center mb-6">Buat Catatan</h1>
          <div className="mb-3">
            <input
              className="rounded p-2 border w-full"
              type="text"
              placeholder="Masukkan Title"
              value={title}
              onChange={this.onTitleChangeEventHandler}
            />
            <p
              className={`text-sm mt-1 ${
                remainingCharacters === 0 ? "text-red-500" : "text-gray-500"
              }`}
            >
              {remainingCharacters} karakter tersisa
            </p>
          </div>
          <textarea
            className="rounded p-2 border mb-6"
            placeholder="Masukkan Catatan Notes"
            name="body"
            value={body}
            onChange={this.onBodyChangeEventHandler}
            id="body"
            cols="30"
            rows="10"
          ></textarea>
          <button
            type="submit"
            className="w-1/2 mx-auto bg-blue-600 p-2 text-white rounded"
          >
            Tambah Notes
          </button>
        </form>
      </div>
    );
  }
}

export default NotesInput;

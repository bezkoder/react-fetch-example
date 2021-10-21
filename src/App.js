import React, { useRef, useState } from "react";
import './App.css';

function App() {
  const baseURL = "http://localhost:8080/api";

  const get_id = useRef(null);
  const get_title = useRef(null);

  const post_title = useRef(null);
  const post_description = useRef(null);

  const put_id = useRef(null);
  const put_title = useRef(null);
  const put_description = useRef(null);
  const put_published = useRef(null);

  const delete_id = useRef(null);

  const [getResult, setGetResult] = useState(null);
  const [postResult, setPostResult] = useState(null);
  const [putResult, setPutResult] = useState(null);
  const [deleteResult, setDeleteResult] = useState(null);

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  }

  async function getAllData() {
    try {
      const res = await fetch(`${baseURL}/tutorials`);

      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }

      const data = await res.json();

      const result = {
        status: res.status + "-" + res.statusText,
        headers: {
          "Content-Type": res.headers.get("Content-Type"),
          "Content-Length": res.headers.get("Content-Length"),
        },
        length: res.headers.get("Content-Length"),
        data: data,
      };

      setGetResult(fortmatResponse(result));
    } catch (err) {
      setGetResult(err.message);
    }
  }

  async function getDataById() {
    const id = get_id.current.value;

    if (id) {
      try {
        const res = await fetch(`${baseURL}/tutorials/${id}`);

        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }

        const data = await res.json();

        const result = {
          data: data,
          status: res.status,
          statusText: res.statusText,
          headers: {
            "Content-Type": res.headers.get("Content-Type"),
            "Content-Length": res.headers.get("Content-Length"),
          },
        };

        setGetResult(fortmatResponse(result));
      } catch (err) {
        setGetResult(err.message);
      }
    }
  }

  async function getDataByTitle() {
    const title = get_title.current.value;

    if (title) {
      try {
        // const res = await fetch(`${baseURL}/tutorials?title=${title}`);

        let url = new URL(`${baseURL}/tutorials`);
        const params = { title: title };
        url.search = new URLSearchParams(params);

        const res = await fetch(url);

        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }

        const data = await res.json();

        const result = {
          status: res.status + "-" + res.statusText,
          headers: {
            "Content-Type": res.headers.get("Content-Type"),
            "Content-Length": res.headers.get("Content-Length"),
          },
          data: data,
        };

        setGetResult(fortmatResponse(result));
      } catch (err) {
        setGetResult(err.message);
      }
    }
  }

  async function postData() {
    const postData = {
      title: post_title.current.value,
      description: post_description.current.value,
    };

    try {
      const res = await fetch(`${baseURL}/tutorials`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
        },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }

      const data = await res.json();

      const result = {
        status: res.status + "-" + res.statusText,
        headers: {
          "Content-Type": res.headers.get("Content-Type"),
          "Content-Length": res.headers.get("Content-Length"),
        },
        data: data,
      };

      setPostResult(fortmatResponse(result));
    } catch (err) {
      setPostResult(err.message);
    }
  }

  async function putData() {
    const id = put_id.current.value;

    if (id) {
      const putData = {
        title: put_title.current.value,
        description: put_description.current.value,
        published: put_published.current.checked,
      };

      try {
        const res = await fetch(`${baseURL}/tutorials/${id}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "token-value",
          },
          body: JSON.stringify(putData),
        });

        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }

        const data = await res.json();

        const result = {
          status: res.status + "-" + res.statusText,
          headers: { "Content-Type": res.headers.get("Content-Type") },
          data: data,
        };

        setPutResult(fortmatResponse(result));
      } catch (err) {
        setPutResult(err.message);
      }
    }
  }

  async function deleteAllData() {
    try {
      const res = await fetch(`${baseURL}/tutorials`, { method: "delete" });

      const data = await res.json();

      const result = {
        status: res.status + "-" + res.statusText,
        headers: { "Content-Type": res.headers.get("Content-Type") },
        data: data,
      };

      setDeleteResult(fortmatResponse(result));
    } catch (err) {
      setDeleteResult(err.message);
    }
  }

  async function deleteDataById() {
    const id = delete_id.current.value;

    if (id){
      try {
        const res = await fetch(`${baseURL}/tutorials/${id}`, { method: "delete" });

        const data = await res.json();

        const result = {
          status: res.status + "-" + res.statusText,
          headers: { "Content-Type": res.headers.get("Content-Type") },
          data: data,
        };

        setDeleteResult(fortmatResponse(result));
      } catch (err) {
        setDeleteResult(err.message);
      }
    }
  }

  const clearGetOutput = () => {
    setGetResult(null);
  }

  const clearPostOutput = () => {
    setPostResult(null);
  }

  const clearPutOutput = () => {
    setPutResult(null);
  }

  const clearDeleteOutput = () => {
    setDeleteResult(null);
  }

  return (
    <div id="app" className="container my-3">
      <h3>React Fetch example</h3>

      <div className="card mt-3">
        <div className="card-header">React Fetch GET - BezKoder.com</div>
        <div className="card-body">
          <div className="input-group input-group-sm">
            <button className="btn btn-sm btn-primary" onClick={getAllData}>Get All</button>

            <input type="text" ref={get_id} className="form-control ml-2" placeholder="Id" />
            <div className="input-group-append">
              <button className="btn btn-sm btn-primary" onClick={getDataById}>Get by Id</button>
            </div>

            <input type="text" ref={get_title} className="form-control ml-2" placeholder="Title" />
            <div className="input-group-append">
              <button className="btn btn-sm btn-primary" onClick={getDataByTitle}>Find By Title</button>
            </div>

            <button className="btn btn-sm btn-warning ml-2" onClick={clearGetOutput}>Clear</button>
          </div>   
          
          { getResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{getResult}</pre></div> }
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header">React Fetch POST - BezKoder.com</div>
        <div className="card-body">
          <div className="form-group">
            <input type="text" className="form-control" ref={post_title} placeholder="Title" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" ref={post_description} placeholder="Description" />
          </div>
          <button className="btn btn-sm btn-primary" onClick={postData}>Post Data</button>
          <button className="btn btn-sm btn-warning ml-2" onClick={clearPostOutput}>Clear</button>

          { postResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{postResult}</pre></div> }
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header">React Fetch PUT - BezKoder.com</div>
        <div className="card-body">
          <div className="form-group">
            <input type="text" className="form-control" ref={put_id} placeholder="Id" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" ref={put_title} placeholder="Title" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" ref={put_description} placeholder="Description" />
          </div>
          <div className="form-check mb-2">
            <input type="checkbox" className="form-check-input" ref={put_published} />
            <label className="form-check-label" htmlFor="put_published">Publish</label>
          </div>
          <button className="btn btn-sm btn-primary" onClick={putData}>Update Data</button>
          <button className="btn btn-sm btn-warning ml-2" onClick={clearPutOutput}>Clear</button>

          { putResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{putResult}</pre></div> }
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header">React Fetch DELETE - BezKoder.com</div>
        <div className="card-body">
          <div className="input-group input-group-sm">
            <button className="btn btn-sm btn-danger" onClick={deleteAllData}>Delete All</button>

            <input type="text" ref={delete_id} className="form-control ml-2" placeholder="Id" />
            <div className="input-group-append">
              <button className="btn btn-sm btn-danger" onClick={deleteDataById}>Delete by Id</button>
            </div>

            <button className="btn btn-sm btn-warning ml-2" onClick={clearDeleteOutput}>Clear</button>
          </div>    
          
          { deleteResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{deleteResult}</pre></div> }      
        </div>
      </div>
 
    </div>
  );
}

export default App;

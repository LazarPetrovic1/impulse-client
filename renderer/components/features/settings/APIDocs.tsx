import styled from "styled-components";
import { Theme } from "../../../styles/theme/type";

const List = styled.ul`background-color: ${({ theme } : { theme: Theme }) => theme.colors.background};`;
const ExplainBlock = styled.article`padding: 1.5rem 0;`
const RequestBlock = styled.aside`
  background-color: ${({ theme } : { theme: Theme }) => theme.colors.background};
  padding: 1rem;
  color: rgb(183, 205, 237);
  font-weight: bolder;
  font-style: oblique;
`

export function APIDocs() {
  // @ts-ignore
  return (
    <div>
      <section className="px-3 py-5">
        <div className="accordion border" id="APIAccordion">
          {/* Introduction Section */}
          <div className="card" style={{ background: "transparent" }}>
            <div className="card-header border-bottom rounded" id="Introduction" style={{ background: "#222" }}>
              <h2 className="mb-0">
                <button
                  className="btn btn-link btn-block"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapse1"
                  aria-expanded="true"
                  aria-controls="collapse1"
                >
                  Introduction
                </button>
              </h2>
            </div>
            <div
              id="collapse1"
              className="collapse"
              aria-labelledby="Introduction"
              data-parent="#APIAccordion"
            >
              <div className="card-body" style={{ background: "#333" }}>
                Welcome to Impulse's Application Programming Interface (API) Documentation<br />
                Keep in mind that this is my first attempt at making a public API for software engineers, so the documentation might not be ideal.<br />
                Impulse's API allows you to query for people's data
                <b>(Keep in mind that sensitive data will either be redacted or altered from what they originally were.</b>
                and/or their posts <b>((Again, the same rule applies.))</b><br />
                Impulse was built with developers first in mind and will always continue to strive for the next best thing.
              </div>
            </div>
          </div>

          {/* How to Use Section */}
          <div className="card" style={{ background: "transparent" }}>
            <div style={{ background: "#222" }} className="card-header border-bottom rounded" id="How to use">
              <h2 className="mb-0">
                <button
                  className="btn btn-link collapsed btn-block"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapse2"
                  aria-expanded="false"
                  aria-controls="collapse2"
                >
                  How to use this public API?
                </button>
              </h2>
            </div>
            <div id="collapse2" className="collapse" aria-labelledby="How to use" data-parent="#APIAccordion">
              <div className="card-body" style={{ background: "#333" }}>
                Simply send an HTTP request to our public API and the results will be returned in JSON.<br />
                Do with the returned data what you will.<br />
                If you're an employer or a corporate body, please consider using Impulse's API as your hiring test for your candidates.<br />
              </div>
            </div>
          </div>

          {/* Users API Section */}
          <div className="card" style={{ background: "transparent" }}>
            <div style={{ background: "#222" }} className="card-header border-bottom rounded" id="Users API">
              <h2 className="mb-0">
                <button
                  className="btn btn-link collapsed btn-block"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapse3"
                  aria-expanded="false"
                  aria-controls="collapse3"
                >
                  The Users' API
                </button>
              </h2>
            </div>
            <div id="collapse3" className="collapse" aria-labelledby="Users API" data-parent="#APIAccordion">
              <div className="card-body" style={{ background: "#333" }}>
                <p>Users API allows for CRUD functionality for users, as well as the ability to search for specific users from a database, and get users' data based on parameters other than id.Users API allows for CRUD functionality for users, as well as the ability to search for specific users from a database, and get users' data based on parameters other than id.</p>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Create User</h3>
                    <span className="badge badge-primary">POST</span>
                  </header>
                  <p>
                    Returns an object that is supposed to represent a real user.<br />
                    This should be saved in the database, as the user won't actually be created on Impulse.
                  </p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/users/public
                  </RequestBlock>
                </ExplainBlock>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Get user by id</h3>
                    <span className="badge badge-secondary">GET</span>
                  </header>
                  <p>Returns a user object based on the id parameter in the URL (denoted via the colon (:)).</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/users/public/:id
                  </RequestBlock>
                </ExplainBlock>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Search for a user</h3>
                    <span className="badge badge-primary">POST</span>
                  </header>
                  <p>Returns all user object that pass the search check, based on firstName, lastName, email and username.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/users/public/search
                  </RequestBlock>
                </ExplainBlock>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Get post info</h3>
                    <span className="badge badge-secondary">GET</span>
                  </header>
                  <p>Returns user information found in posts (firstName, lastName and username) based on the id parameter.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/users/public/postedby/:id
                  </RequestBlock>
                </ExplainBlock>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Get user by username</h3>
                    <span className="badge badge-secondary">GET</span>
                  </header>
                  <p>Returns user information based on the username parameter.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/users/public/uname/:username
                  </RequestBlock>
                </ExplainBlock>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Update user</h3>
                    <span className="badge badge-success">PUT</span>
                  </header>
                  <p>Returns the updated user object based on information sent and the id of the user.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/users/public/:id
                  </RequestBlock>
                </ExplainBlock>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Delete user</h3>
                    <span className="badge badge-danger">DELETE</span>
                  </header>
                  <p>Remove a user based on the id parameter.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/users/public/:id
                  </RequestBlock>
                </ExplainBlock>
              </div>
            </div>
          </div>

          {/* Status API Section */}
          <div className="card" style={{ background: "transparent" }}>
            <div style={{ background: "#222" }} className="card-header border-bottom rounded" id="Status API">
              <h2 className="mb-0">
                <button
                  className="btn btn-link collapsed btn-block"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapse4"
                  aria-expanded="false"
                  aria-controls="collapse4"
                >
                  The Status API
                </button>
              </h2>
            </div>
            <div id="collapse4" className="collapse" aria-labelledby="Status API" data-parent="#APIAccordion">
              <div className="card-body" style={{ background: "#333" }}>
                <p>Status API allows for CRUD functionality for textual posts.</p>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Create status</h3>
                    <span className="badge badge-primary">POST</span>
                  </header>
                  <p>
                    Returns an object that is supposed to represent a real textual post.<br />
                    This should be saved in the database, as the status won't actually be created on Impulse.<br />
                    Be sure to append the id of a user to the end of the URL.
                  </p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/status/public/:id
                  </RequestBlock>
                </ExplainBlock>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Get all status posts</h3>
                    <span className="badge badge-secondary">GET</span>
                  </header>
                  <p>Returns all status posts.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/status/public
                  </RequestBlock>
                </ExplainBlock>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Get status post by id</h3>
                    <span className="badge badge-secondary">GET</span>
                  </header>
                  <p>Returns a status post based on the id parameter.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/status/public/status/:id
                  </RequestBlock>
                </ExplainBlock>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Remove status post by id</h3>
                    <span className="badge badge-danger">DELETE</span>
                  </header>
                  <p>Removes a status post based on the id parameter.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/status/public/:id
                  </RequestBlock>
                </ExplainBlock>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Get user's status posts</h3>
                    <span className="badge badge-secondary">GET</span>
                  </header>
                  <p>Get all of user's status posts.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/status/public/:id
                  </RequestBlock>
                </ExplainBlock>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Save status post</h3>
                    <span className="badge badge-success">PUT</span>
                  </header>
                  <p>Save a status post.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/status/public/impulse/:id
                  </RequestBlock>
                </ExplainBlock>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Like status post</h3>
                    <span className="badge badge-success">PUT</span>
                  </header>
                  <p>Like a status post.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/status/public/like/:id
                  </RequestBlock>
                </ExplainBlock>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Dislike status post</h3>
                    <span className="badge badge-success">PUT</span>
                  </header>
                  <p>Dislike a status post.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/status/public/dislike/:id
                  </RequestBlock>
                </ExplainBlock>
              </div>
            </div>
          </div>

          {/* Video API Section */}
          <div className="card" style={{ background: "transparent" }}>
            <div style={{ background: "#222" }} className="card-header border-bottom rounded" id="Video API">
              <h2 className="mb-0">
                <button
                  className="btn btn-link collapsed btn-block"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapse5"
                  aria-expanded="false"
                  aria-controls="collapse5"
                >
                  The Video API
                </button>
              </h2>
            </div>
            <div id="collapse5" className="collapse" aria-labelledby="Video API" data-parent="#APIAccordion">
              <div style={{ background: "#333" }} className="card-body">
                <p>Simple GET functionality for videos posts.</p>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Get all videos</h3>
                    <span className="badge badge-secondary">GET</span>
                  </header>
                  <p>Retrieves all videos.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/videos/public
                  </RequestBlock>
                </ExplainBlock>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Get a video by id</h3>
                    <span className="badge badge-secondary">GET</span>
                  </header>
                  <p>Retrieves a video by id.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/videos/public/:id
                  </RequestBlock>
                </ExplainBlock>
              </div>
            </div>
          </div>

          {/* Forum API Section */}
          <div className="card" style={{ background: "transparent" }}>
            <div style={{ background: "#222" }} className="card-header border-bottom rounded" id="Forum API">
              <h2 className="mb-0">
                <button
                  className="btn btn-link collapsed btn-block"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapse6"
                  aria-expanded="false"
                  aria-controls="collapse6"
                >
                  The Issues API
                </button>
              </h2>
            </div>
            <div id="collapse6" className="collapse" aria-labelledby="Forum API" data-parent="#APIAccordion">
              <div className="card-body" style={{ background: "#333" }}>
                <p>Issues API allows for CRUD functionality for issue posts.</p>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Create an issue post</h3>
                    <span className="badge badge-primary">POST</span>
                  </header>
                  <p>Create an issue. Requires user's id.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/issues/public/:id
                  </RequestBlock>
                </ExplainBlock>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Find user's issues</h3>
                    <span className="badge badge-secondary">GET</span>
                  </header>
                  <p>Find issues of user by their id.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/issues/public/user/:id
                  </RequestBlock>
                </ExplainBlock>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Get all issues</h3>
                    <span className="badge badge-secondary">GET</span>
                  </header>
                  <p>Returns all issues available.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/issues/public
                  </RequestBlock>
                </ExplainBlock>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Get issue by id</h3>
                    <span className="badge badge-secondary">GET</span>
                  </header>
                  <p>Returns the forum post with the same id.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/issues/public/:id
                  </RequestBlock>
                </ExplainBlock>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Remove issue post</h3>
                    <span className="badge badge-danger">DELETE</span>
                  </header>
                  <p>Removes the issue post and returns the remaining issues.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/issues/public/:id
                  </RequestBlock>
                </ExplainBlock>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Update issue</h3>
                    <span className="badge badge-success">PUT</span>
                  </header>
                  <p>Updates the issue based on the request body and returns it.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/issues/public/:id
                  </RequestBlock>
                </ExplainBlock>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Comment on issue</h3>
                    <span className="badge badge-primary">POST</span>
                  </header>
                  <p>Adds a comment to the issue.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/issues/public/comment/:id/:uid
                  </RequestBlock>
                </ExplainBlock>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Get comments of a issue</h3>
                    <span className="badge badge-secondary">GET</span>
                  </header>
                  <p>Returns comments of a issue.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/issues/public/comment/:id
                  </RequestBlock>
                </ExplainBlock>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Edit comment</h3>
                    <span className="badge badge-success">PUT</span>
                  </header>
                  <p>Edits the comment of a issue.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/issues/public/comment/:id/:commentid/:uid
                  </RequestBlock>
                </ExplainBlock>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Delete comment</h3>
                    <span className="badge badge-danger">DELETE</span>
                  </header>
                  <p>Deletes the comment of a issue.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/issues/public/comment/:id/:commentid/:uid
                  </RequestBlock>
                </ExplainBlock>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Reply to comment</h3>
                    <span className="badge badge-primary">POST</span>
                  </header>
                  <p>Adds a reply to the comment.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/issues/public/comment/:id/:commentid/:uid/reply
                  </RequestBlock>
                </ExplainBlock>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Edit reply</h3>
                    <span className="badge badge-success">PUT</span>
                  </header>
                  <p>Edits a reply to the comment.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/issues/public/comment/:id/:commentid/:uid/reply
                  </RequestBlock>
                </ExplainBlock>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Get replies</h3>
                    <span className="badge badge-secondary">GET</span>
                  </header>
                  <p>Get replies of a comment.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/issues/public/comment/:id/:commentid/reply
                  </RequestBlock>
                </ExplainBlock>
                <ExplainBlock>
                  <header>
                    <h3 className="d-inline-block mr-3">Delete reply</h3>
                    <span className="badge badge-danger">DELETE</span>
                  </header>
                  <p>Delete the reply to a comment.</p>
                  <RequestBlock>
                    http://localhost:3000/impulse/api/v1/issues/public/comment/:id/:commentid/:replyid/:uid
                  </RequestBlock>
                </ExplainBlock>
              </div>
            </div>
          </div>

           {/* Footnotes Section */}
            <div className="card" style={{ background: "transparent" }}>
              <div className="card-header border-bottom rounded" id="Footnotes" style={{ background: "#222" }}>
                <h2 className="mb-0">
                  <button
                  className="btn btn-link btn-block"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapse-footnote"
                  aria-expanded="true"
                  aria-controls="collapse-footnote"
                >
                  Footnotes
                </button>
              </h2>
            </div>
            <div
              id="collapse-footnote"
              className="collapse"
              aria-labelledby="Footnotes"
              data-parent="#APIAccordion"
            >
              <List className="list-unstyled card-body" style={{ background: "#333" }}>
                <li>CRUD - Create, Read, Update, & Delete available resources</li>
                <li>URL - Uniform Resource Locator</li>
                <li>URI - Uniform Resource Identifier</li>
                <li>HTTP - Hyper-Text Transfer Protocol</li>
                <li>API - Application Programming Interface</li>
                <li>
                  'Sending requests to the server' is a fancy way of saying 'getting the information for ourselves'. There are a couple of different types of requests, but the most important ones are:
                </li>
                <ol>
                  <li>GET - Retrieves information from the source</li>
                  <li>POST - Creates an additional resource</li>
                  <li>PUT - Updates an existing resource completely based on the new resource</li>
                  <li>PATCH - Updates an existing resource partially based on the new resource</li>
                  <li>DELETE - Deletes a resource</li>
                </ol>
              </List>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
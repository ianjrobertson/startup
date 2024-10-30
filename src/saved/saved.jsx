import React from "react";

export function Saved() {
  return (
    <main>
      <h2>From Database: Saved Spots</h2>
      <div className="saved-container">
        <table className="saved-table">
          <thead>
            <tr>
              <th>Hammock Spot</th>
              <th>Username</th>
              <th>Location</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img
                  src="https://thehammockexpert.com/wp-content/uploads/2018/01/how-to-hang-your-hammock-the-hammock-expert-3-1-768x512.jpg"
                  alt="Hammock Spot"
                  width="100"
                />
              </td>
              <td>"Username here"</td>
              <td>
                <a href="https://maps.google.com" target="_blank">
                  Use Map API: View Location
                </a>
              </td>
              <td class="delete-action">X</td>
            </tr>
            <tr>
              <td>
                <img
                  src="https://thehammockexpert.com/wp-content/uploads/2018/01/how-to-hang-your-hammock-the-hammock-expert-3-1-768x512.jpg"
                  alt="Hammock Spot"
                  width="100"
                />
              </td>
              <td>"Username here"</td>
              <td>
                <a href="https://maps.google.com" target="_blank">
                  Use Map API: View Location
                </a>
              </td>
              <td className="delete-action">X</td>
            </tr>
            <tr>
              <td>
                <img
                  src="https://thehammockexpert.com/wp-content/uploads/2018/01/how-to-hang-your-hammock-the-hammock-expert-3-1-768x512.jpg"
                  alt="Hammock Spot"
                  width="100"
                />
              </td>
              <td>"Username name"</td>
              <td>
                <a href="https://maps.google.com" target="_blank">
                  Use Map API: View Location
                </a>
              </td>
              <td className="delete-action">X</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}

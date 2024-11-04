import React from "react";

function TopSellingsTable({ items }) {
  return (
    <table className="table table-borderless datatable">
      <thead className="table-light">
        <tr>
          <th scope="col">Preview</th>
          <th scope="col">Product</th>
          <th scope="col">Price</th>
          <th scope="col">Sold</th>
          <th scope="col">Revenue</th>
        </tr>
      </thead>
      <tbody>
        {items && items.length > 0 ? (
          items.map((item) => (
            <tr key={item._id}>
              <th scope="row">
                <a href="#">
                  <img src={item.preview} alt="" />
                </a>
              </th>
              <td>
                <a href="#" className="text-primary fw-bold">
                  {item.name}
                </a>
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td className="fw-bold">{item.sold}</td>
              <td>${(item.price * item.sold).toLocaleString("en-US")}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">No items to display</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default TopSellingsTable;

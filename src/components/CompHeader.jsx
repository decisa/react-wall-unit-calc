import React, { Component } from "react";

const CompHeader = props => {
  return (
    <div className="composition-header">
      <div style={{ textAlign: "center" }}>Qty</div>
      <div>Part Description</div>
      <div style={{ textAlign: "right" }}>Price</div>
      <div style={{ textAlign: "right" }}>Total</div>
      <div style={{ textAlign: "center" }}>&times;</div>
    </div>
  );
};

export default CompHeader;

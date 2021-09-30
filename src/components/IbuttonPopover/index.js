import "./ibuttonpopover.css";
import address from "../../assets/address.png";
import cross from "../../assets/cross.svg";

function IbuttonPopover(props) {
  return (
    <div className="popover-conatiner">
      <span className="APY">APY</span>
      <img src={cross} onClick={props.onHide} className="cross" />
      <div className="divider"></div>
      <table>
        <tr>
          <th style={{ paddingLeft: "0px" }}>Timeframe</th>
          <th>ROI</th>
          <th>PPDEX per $1,000</th>
        </tr>
        <tr>
          <td style={{ paddingLeft: "0px" }}>1d</td>
          <td>0.23%</td>
          <td>0.14</td>
        </tr>
        <tr>
          <td style={{ paddingLeft: "0px" }}>7d</td>
          <td>1.54%</td>
          <td>0.99</td>
        </tr>
        <tr>
          <td style={{ paddingLeft: "0px" }}>30d</td>
          <td>5.45%</td>
          <td>4.85</td>
        </tr>
        <tr>
          <td style={{ paddingLeft: "0px" }}>365d(APY)</td>
          <td>87%</td>
          <td>80.38</td>
        </tr>
      </table>
      <br />
      <br />
      <br />

      <span className="paragraph">
        Calculated based on current rates. Compounding 288x daily. Rates are
        estimates provided for your convenience only, and by no means represent
        guaranteed returns.
        <br />
        <br />
        All estimated rates take into account this pool’s 2% performance fee
      </span>
      <br />
      <br />
      <br />

      <span className="Buy-PPBLZ">{props.button}</span>
    </div>
  );
}

export default IbuttonPopover;

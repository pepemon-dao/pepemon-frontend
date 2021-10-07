import styled from "styled-components";
import footercover from "../../assets/foot.png";
import logoexpand from "../../assets/logoexpand.png";

const Footer = () => {
	return (
		<div style={{
			backgroundPosition: "center",
			backgroundImage: `url(${footercover})`,
			backgroundSize: "cover",
			backgroundRepeat: "no-repeat",
		}}>
			<div style={{ height: "450px" }}></div>

			<div className="footer-wrap">
				<div className="footer">
					<div>
						<img src={logoexpand} className="BrandLogoIconDefault" />
					</div>
					<div className="footer">
						<div className="menu-align">
							<span className="menu-top">PEPEMON</span>
							<br />
							<br />
							<span className="menu-list">
								About
								<br />
								Whitepaper
								<br />
								Pepemon the game
								<br />
							</span>
						</div>
						<div className="menu-align">
							<span className="menu-top">TOKENS</span>
							<br />
							<br />
							<span className="menu-list">
								PPBLZ Contract
								<br />
								PPDEX Contract
								<br />
								Buy $PPBLZ
								<br />
								Buy $PPDEX
								<br />
							</span>
						</div>

						<div className="menu-align">
							<span className="menu-top">SOCIALS</span>
							<br />
							<br />
							<span className="menu-list">
								Twitter
								<br />
								Telegram
								<br />
								Discord <br />
								Github
								<br />
								Medium
								<br />
								OpenSea
								<br />
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Footer;

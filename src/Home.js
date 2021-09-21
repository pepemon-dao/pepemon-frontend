import "./Home.css";
import group from "./assets/group3x.png";
import walkr from "./assets/walkr.png";
import walkh from "./assets/walkh.png";
import walkw from "./assets/walkw.png";

import logo from "./assets/logo.png";
import cover from "./assets/cover.png";
import coverblack from "./assets/coverblack.png";
import footercover from "./assets/foot.png";
import discord from "./assets/discord.svg";
import twitter from "./assets/twitter.svg";
import medium from "./assets/medium.svg";
import telegram from "./assets/telegram.svg";
import pepemon from "./assets/pepemon.png";
import homeactive from "./assets/homeactive.png";
import homefade from "./assets/homefade.png";
import fudizard from "./assets/fudizard.png";
import pepemander from "./assets/pepemander.gif";
import logoexpand from "./assets/logoexpand.png";
import becomepepbutton from "./assets/becomepepbutton.png";
import address from "./assets/address.png";
import bluecard from "./assets/bluecard.png";
import buynowbutton from "./assets/buynowbutton.png";
import buyyourbutton from "./assets/buyyourbutton.png";
import claimyourcardbutton from "./assets/claimyourcardbutton.png";
import etherscroll from "./assets/etherscroll.png";
import pepechucard from "./assets/pepechucard.png";
import signupbutton from "./assets/signupbutton.png";
import stakingbutton from "./assets/stakingbutton.png";
import witchenerycard from "./assets/witchenerycard.png";
import pepechurcard from "./assets/pepechurcard.png";
import downgreenarrow from "./assets/downgreenarrow.svg";

function Home() {
  return (
    <div className="main-container">
      <div className="menu-wrap">
        <img src={pepemon} className="_Pepemon_Icon_color" alt="logo" />

        <div className="menu">
          <img src={homefade} className="HomeDefault" alt="logo" />
          <img src={homefade} className="HomeDefault" alt="logo" />
          <img src={homeactive} className="HomeDefault" alt="logo" />
          <img src={homefade} className="HomeDefault" alt="logo" />
          <img src={homefade} className="HomeDefault" alt="logo" />
        </div>
      </div>
      <div className="container-wrap">
        <div
          style={{
            backgroundPosition: "center",
            backgroundImage: `url(${cover})`,

            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="h-bar">
            <span className="menu-text" style={{ marginTop: "20px" }}>
              Ether
            </span>

            <div className="top-menu-bar">
              <span className="menu-text">12.213 $PPBLZ </span>
              <span className="menu-text">98.596 $PPDEX</span>
              <span className="menu-text">3 unique cards</span>
              <img
                src={address}
                className=""
                alt="logo"
                style={{ marginTop: "5px" }}
              />
            </div>
          </div>
          <div className="main-container">
            <div className="text-container">
              <p className="Gotta-claim-em-all">Gotta claim ‘em all!</p>
              <div style={{ marginTop: "30px" }}>
                <span className="Pepemon-is-a-digital">
                  Pepemon is a digital collectible card game on blockchain owned
                  by players. Powered by DeFi and NFTs as in-game assets.
                </span>
              </div>

              <div className="actiondiv">
                <div className="Rectangle">
                  <div className="Rectanglebl">
                    <span className="number">1</span>
                  </div>
                  <div className="rectangle-text">
                    <span className="Become-a-true-Pepetr">
                      Become a true Pepetrainer by getting $PPBLZ
                    </span>
                    <img
                      src={becomepepbutton}
                      className="main-landing-button"
                    />
                  </div>
                </div>

                <div className="Rectangle" style={{ marginTop: "150px" }}>
                  <div className="Rectanglebl">
                    <span className="number">2</span>
                  </div>
                  <div className="rectangle-text">
                    <span className="Become-a-true-Pepetr">
                      Stake your $PPBLZ with
                    </span>

                    <br />
                    <div style={{ marginTop: "10px" }}>
                      <span className="-APY">100% APY</span>
                    </div>
                    <img src={stakingbutton} className="main-landing-button" />
                  </div>
                </div>

                <div className="Rectangle" style={{ marginTop: "300px" }}>
                  <div className="Rectanglebl">
                    <span className="number">3</span>
                  </div>
                  <div className="rectangle-text">
                    <span className="Become-a-true-Pepetr">
                      Buy or claim your $PPDEX and get booster packs right now!
                    </span>
                    <img
                      src={buyyourbutton}
                      className="main-landing-button"
                      style={{ marginTop: "20px" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="img-container">
              <img src={group} className="poketeam" alt="logo" />
            </div>
          </div>
          <div style={{ height: "100px" }} />
        </div>
        <div
          style={{ height: "1100px", display: "flex", flexDirection: "row" }}
        >
          <div style={{ width: "50%" }}>
            <div style={{ position: "relative" }}>
              <img
                src={witchenerycard}
                style={{
                  objectFit: "cover",
                  width: "331px",
                  position: "absolute",
                  right: "372px",
                  top: "140px",
                  zIndex: "99",
                }}
              />
              <img
                src={pepechucard}
                style={{
                  objectFit: "cover",
                  width: "584px",
                  position: "absolute",
                  right: "35px",
                  top: "294px",
                }}
              />

              <img
                src={bluecard}
                style={{
                  objectFit: "cover",
                  width: "284px",
                  position: "absolute",
                  left: "150px",
                  top: "787px",
                }}
              />

              <img
                src={pepechurcard}
                style={{
                  objectFit: "cover",
                  width: "158px",
                  position: "absolute",
                  right: "169px",
                  top: "0",
                }}
              />
            </div>
          </div>
          <div className="cards-text-container">
            <span class="Collect-unique-Pepem">
              Collect unique Pepemon cards created by real artists{" "}
            </span>
            <span class="Pepemon-NFT">
              Pepemon NFT
              <div
                className="underline-div"
                style={{ width: "103px", marginLeft: "0" }}
              ></div>
            </span>
            <span class="Use-your-Pepedex-to">
              Use your Pepedex to claim these unique NFTs pepemon cards. All
              cards created by real artist all over the world.
              <br />
              <br />
              Once you have claimed these cards, you can become the very best by
              using your NFTs in a trading card game on blockchain!
              <br />
              <br />
              "Pepechu, I choose you!"
            </span>
            <img src={claimyourcardbutton} style={{ width: "30%" }} />
          </div>
        </div>

        <div
          style={{
            backgroundPosition: "center",
            backgroundImage: `url(${coverblack})`,
            display: "flex",
            flexdirection: "column",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <span className="Lorem-ipsum-dolor-si" style={{ marginTop: "120px" }}>
            Lorem ipsum dolor sit amet, consectetur elit.
          </span>
          <span className="To-the-moon" style={{ marginTop: "30px" }}>
            To the moon
            <div className="underline-div"></div>
          </span>
          <span className="Ut-enim-ad-minim-ven" style={{ marginTop: "40px" }}>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </span>

          <div className="apidiv">
            <div className="api-card" style={{ position: "relative" }}>
              <span className="Total-PPBLZ-value-lo">
                Total PPBLZ value locked
              </span>
              <span className="boldtext">$ 2,757,569.41</span>
              <img
                src={walkr}
                alt="logo"
                style={{
                  width: "106px",
                  height: "106px",
                  position: "absolute",
                  top: "-110px",
                }}
              />
            </div>

            <div className="api-card">
              <span className="Total-PPBLZ-value-lo">PPDEX Burned</span>
              <span className="boldtext">60,509.21</span>
            </div>

            <div className="api-card">
              <span className="Total-PPBLZ-value-lo">Total NFT’s solds</span>
              <span className="boldtext">1029</span>
            </div>
          </div>
          <div className="apidiv">
            <div className="api-div-second">
              <span className="-APY-Copy">100% APY</span>
              <div style={{ marginTop: "20px" }}>
                <span className="Ut-enim-ad-minim-ven-Copy">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi
                  ut aliquip ex ea commodo consequat.
                </span>
              </div>
            </div>

            <div className="api-div-second" style={{ position: "relative" }}>
              <span className="-APY-Copy">Staking</span>
              <img
                src={walkh}
                alt="logo"
                style={{
                  width: "106px",
                  height: "106px",
                  position: "absolute",
                  right: "-110px",
                }}
              />
              <br />
              <div style={{ marginTop: "20px" }}>
                <span className="Ut-enim-ad-minim-ven-Copy">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi
                  ut aliquip ex ea commodo consequat.
                </span>
              </div>
            </div>
            <div style={{ height: "1200px" }} />
          </div>

          <div className="fudizard-container">
            <div style={{ width: "60%", padding: "200px" }}>
              <span className="Get-yours-before-it">
                Get yours before <br />
                it too late!
              </span>
              <br />
              <div className="graph-detail-container">
                <span className="Golden-Fudizard">
                  Golden Fudizard
                  <div
                    className="underline-div"
                    style={{ width: "130px", marginLeft: "0" }}
                  ></div>
                </span>
                <br />
                <div className="graph-detail">
                  <span className="graph-detail-head">total</span>
                  <span className="graph-detail-number">27</span>
                </div>
                <div className="graph-detail">
                  <span className="graph-detail-head">owners</span>
                  <span className="graph-detail-number">6</span>
                </div>
                <div className="graph-detail">
                  <span className="graph-detail-head">views</span>
                  <span className="graph-detail-number">889</span>
                </div>
              </div>
              <div style={{ height: "400px" }}></div>
              <img src={buynowbutton} style={{ width: "60%" }} />
            </div>
            <div style={{ width: "56%" }}>
              <img src={fudizard} className="fudizard" />
            </div>
          </div>
        </div>
        <div classname="middle-container">
          <div className="stake-evolve">
            <div className="img-evolve">
              <img className="pepemander-display" src={pepemander} />
              <div className="dotted-div" style={{ marginTop: "470px" }}>
                <img src={downgreenarrow} className="downgreenarrow" />
              </div>
              <div className="dotted-div" style={{ marginTop: "870px" }}></div>
            </div>
            <div className="text-evolve">
              <div></div>
              <span className="Stake-to-evolve">Stake to evolve</span>
              <span className="Staking-events">
                Staking events
                <div
                  className="underline-div"
                  style={{ width: "113px", marginLeft: "0" }}
                ></div>
              </span>
              <span className="Stake-your-awesome-P">
                Stake your awesome Pepemon cards to receive even more awesome
                exclusive Pepemon rewards.
                <br />
                <br />
                Place Pepemander into the next rectangle to evolve!
              </span>
            </div>
          </div>

          <div className="text-logo-contain">
            <div style={{ width: "50%", paddingLeft: "120px" }}>
              <div style={{ width: "50%", marginLeft: "50px" }}>
                <span className="The-Pepemon-Game">The Pepemon Game</span>
                <br />
                <span className="underlined-text">Comming soon</span>
                <div
                  className="underline-div"
                  style={{ width: "110px", marginLeft: "0" }}
                ></div>

                <br />
                <span className="Duel-other-trainers">
                  <br />
                  Duel other trainers on an epic game powered by DeFi and NFT's.
                  Read more about the game mechanics
                  <span className="text-style-1">here</span>and let's discuss on
                  the different strategies for the closed Beta launch happening
                  soon for card holders.
                </span>
              </div>
            </div>

            <div style={{ width: "50%" }}>
              <img classname="logoexpand" src={logoexpand} />
            </div>
          </div>
        </div>

        <div className="email">
          <span className="Stay-up-to-date-and" style={{ marginTop: "30px" }}>
            Stay up to date and claim ‘em all
          </span>
          <span className="underlined-text" style={{ marginTop: "20px" }}>
            Newsletter
            <div className="underline-div"></div>
          </span>
          <span className="Be-the-first-to-coll">
            Be the first to collect all the new Pepemons. You can unsunscribe
            anytime.
          </span>
          <div className="input-email">
            <div className="input-email-input">{/* <input  /> */}</div>
            <div>
              <img src={signupbutton} className="" alt="logo" />
            </div>
          </div>

          <img src={walkw} style={{ marginRight: "125px" }} alt="logo" />
        </div>
        <div className="social-box-cont">
          <span className="Say-hi-and-meet-all" style={{ marginTop: "90px" }}>
            Say hi and meet all the <br />
            Pepetrainers
          </span>

          <span className="underlined-text" style={{ marginTop: "25px" }}>
            Our socials
            <div className="underline-div"></div>
          </span>
          <div className="social-box" style={{ marginTop: "25px" }}>
            <div className="social-container">
              <div style={{ marginTop: "5px" }}>
                <img src={twitter} className="SymbolsIconsSocial" alt="logo" />
              </div>

              <div style={{ marginTop: "7px" }}>
                <span className="social-head">Twitter</span>
              </div>

              <div className="social-desc-conatiner">
                <span className="social-desc" style={{}}>
                  Follow us on Twitter for all updates and anouncements.
                </span>
              </div>
            </div>
            <div className="social-container">
              <div style={{ marginTop: "5px" }}>
                <img src={telegram} className="SymbolsIconsSocial" alt="logo" />
              </div>

              <div style={{ marginTop: "7px" }}>
                <span className="social-head">Telegram</span>
              </div>

              <div className="social-desc-conatiner">
                <span className="social-desc">
                  Join us on Telegram to ask us questions and talk with your
                  fellow Pepemon trainers.
                </span>
              </div>
            </div>
            <div className="social-container">
              <div style={{ marginTop: "5px" }}>
                <img src={discord} className="SymbolsIconsSocial" alt="logo" />
              </div>

              <div style={{ marginTop: "7px" }}>
                <span className="social-head">Discord</span>
              </div>

              <div className="social-desc-conatiner">
                <span className="social-desc">
                  Come hang out with us and all the Pepemon trainers on Discord.
                </span>
              </div>
            </div>
            <div className="social-container">
              <div style={{ marginTop: "5px" }}>
                <img src={medium} className="SymbolsIconsSocial" alt="logo" />
              </div>

              <div style={{ marginTop: "7px" }}>
                <span className="social-head">Medium</span>
              </div>

              <div className="social-desc-conatiner">
                <span className="social-desc">
                  Find more detailed articles on Medium about Pepemon and the
                  ecosystem.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundPosition: "center",
            backgroundImage: `url(${footercover})`,

            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
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
            {/* <div className="bottomline"></div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

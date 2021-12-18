import {userInfo} from "os";
import {createInterface} from "readline/promises";
import {stdin as input} from "process";
import {request} from "https";
import {createRenderer} from "../index.mjs";

const ignore = () => {};

const getBitcoinPrice = () => {
  return new Promise((resolve, reject) => {
    let data = "";

    const bitcoinRequest = request({
      hostname: "api.coindesk.com",
      path: "/v1/bpi/currentprice.json",
      port: 443,
      method: "GET"
    }, response => {
      response.on("data", chunk => {
        data += chunk.toString();
      });

      response.on("end", () => {
        try {
          resolve(JSON.parse(data).bpi.EUR.rate);
        } catch (error) {
          reject(error);
        }
      });
    });

    bitcoinRequest.on("error", error => {
      reject(error);
    });

    bitcoinRequest.end();
  });
};

const getUsername = () => {
  const userInformations = userInfo();

  if (!Object.prototype.hasOwnProperty.call(userInformations, "username")) {
    return "unknown";
  }

  const {username} = userInformations;

  if (typeof username !== "string") {
    return "unknown";
  }

  return username;
};

const render = createRenderer({
  createInterface,
  input
});

const dispatch = render({
  initialBlocks: [
    {
      name: "bitcoin",
      full_text: ""
    },
    {
      name: "username",
      full_text: getUsername()
    }
  ],
  onDispatch: ({blocks, action: {name, payload}}) => {
    switch (name) {
      case "BITCOIN_SET_FULL_TEXT":
        return blocks.map(block => {
          if (block.name !== "bitcoin") {
            return block;
          }

          return {
            ...block,
            full_text: payload
          };
        })

      default:
        return blocks;
    }
  }
});

getBitcoinPrice().then(price => {
  dispatch({
    name: "BITCOIN_SET_FULL_TEXT",
    payload: price
  });
}).catch(ignore);

setInterval(() => {
  getBitcoinPrice().then(price => {
    dispatch({
      name: "BITCOIN_SET_FULL_TEXT",
      payload: price
    });
  }).catch(ignore);
}, 1000 * 60 * 30);

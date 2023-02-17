import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useNFTs,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract, loading, error } = useContract(
    "0x7bc0E8664555B2E5220bF910491e71c281894217"
  );

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );
  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async ({ form }) => {
    try {
      await createCampaign([
        address,
        form.title,
        form.description,
        form.target,
        //convert date to timestamp
        form.deadline.getTime() / 1000,
        form.image,
      ]);
      console.log("Campaign created");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StateContext.Provider
      value={{ createCampaign: publishCampaign, connect, address, contract }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import axios from 'axios';

import { getBeefyApi } from '../apis/instances';
import { BeefyState } from '../../../redux-types';

import christmasAbi from '../../../config/abi/christmasAbi.json';

export const fetchGalaxyPoints = createAsyncThunk(
  'points/fetchGalaxyPoints',
  async (_, thunkAPI) => {
    const api = getBeefyApi();
    const walletAddress = (thunkAPI.getState() as BeefyState).user.wallet.address;
    return await api.getGalaxyPoints(walletAddress);
  }
);

// user with nft - '0xBcf23e91E99D5c0DC16F2C9eF99036362C0ab81e'
export const getNftData = createAsyncThunk('points/getNftData', async (_, thunkApi) => {
  try {
    const contractAddress = '0x705c3dfb340fc9c75d30e1ea41299d34159f3638';
    const tokenId = 1;
    const walletAddress = (thunkApi.getState() as BeefyState).user.wallet.address;
    const provider = new ethers.JsonRpcProvider(
      `https://polygon-mainnet.infura.io/v3/${import.meta.env.VITE_APP_INFURA_KEY}`
    );
    const nftContract = new ethers.Contract(contractAddress, christmasAbi, provider);
    const balance = await nftContract.balanceOf(walletAddress);

    const { data: metadata } = await axios(await nftContract.tokenURI(tokenId));

    return balance > 0 ? metadata : null;
  } catch (error) {
    console.error('Error checking NFT balance:', error.message);
    return null;
  }
});

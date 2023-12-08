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
    const contractAddress = '0x1992A7D5Fe9E6A81453151E18cAE7777b9D9452F';
    const walletAddress = (thunkApi.getState() as BeefyState).user.wallet.address;
    const provider = new ethers.JsonRpcProvider(
      `https://polygon-mainnet.infura.io/v3/${import.meta.env.VITE_APP_INFURA_KEY}`
    );
    const nftContract = new ethers.Contract(contractAddress, christmasAbi, provider);
    const numMinted = await nftContract.getNumMinted();
    let tokenId;

    for (let i = 1; i <= parseInt(numMinted); i++) {
      const isOwnerOf = await nftContract.isOwnerOf(walletAddress, i);

      if (isOwnerOf) {
        tokenId = i;
      }
    }

    const balance = await nftContract.balanceOf(walletAddress);

    const { data: metadata } = await axios(await nftContract.tokenURI(tokenId));

    return balance > 0 && typeof tokenId !== 'undefined' ? metadata : null;
  } catch (error) {
    console.error('Error checking NFT balance:', error.message);
    return null;
  }
});

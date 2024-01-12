import { createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

import { getBeefyApi } from '../apis/instances';
import { BeefyState } from '../../../redux-types';

import nftAbi from '../../../config/abi/nftAbi.json';

const nftAddresses: string[] = [
  // Odysea Freshman
  '0x0d5015607e6c52f400e32a85b6fe733a2e92a40a',
  // Odysea Graduate
  '0xa6e98b3c84df80c12362216ef43d097d4b93b2a7',
  // Odysea Academic
  '0xa0f367563f5d3db660367528ac08e7b71d248da9',
  // Odysea Erudit
  '0x63b35eba399d06135c09ec3a20ae72a3205fb5ed',
];

export const fetchGalaxyPoints = createAsyncThunk(
  'points/fetchGalaxyPoints',
  async (_, thunkAPI) => {
    const api = getBeefyApi();
    const walletAddress = (thunkAPI.getState() as BeefyState).user.wallet.address;
    return await api.getGalaxyPoints(walletAddress);
  }
);

// user with nft - '0xBcf23e91E99D5c0DC16F2C9eF99036362C0ab81e'
export const getMissionLevel = createAsyncThunk('points/getMissionLevel', async (_, thunkApi) => {
  try {
    let level: number = 0;
    const walletAddress = (thunkApi.getState() as BeefyState).user.wallet.address;
    const provider = new ethers.JsonRpcProvider(
      `https://polygon-mainnet.infura.io/v3/${import.meta.env.VITE_APP_INFURA_KEY}`
    );

    for (let i = 0; i < nftAddresses.length; i++) {
      const contractAddress = nftAddresses[i];
      const nftContract = new ethers.Contract(contractAddress, nftAbi, provider);
      const balance = await nftContract.balanceOf(walletAddress);

      if (balance > 0) {
        level = i + 1;
        break;
      } else {
        continue;
      }
    }

    return level;
  } catch (error) {
    console.error('Error checking NFT balance:', error.message);
    return null;
  }
});

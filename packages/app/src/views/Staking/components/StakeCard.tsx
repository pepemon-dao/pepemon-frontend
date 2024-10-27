import React, { useCallback, useEffect, useState, useRef, useContext } from 'react';
import styled from "styled-components";
import { ethers } from 'ethers';
import { Spacer, Button, Title, IButtonPopover, Text, ContentCentered } from '../../../components';
import { PepemonProviderContext } from '../../../contexts';
import { useTokenPrices, useHorizontalScroll } from '../../../hooks';
import { calculatePpblzApy, calculatePpblzEthLpApy, correctChainIsLoaded } from '../../../utils';
import { pepeball, uniswap, ppdexLogo } from '../../../assets';
import { theme } from '../../../theme';
import { sendTransaction } from '../../../pepemon/utils';

const StakeCard: React.FC<any> = () => {
    const [ppblzStakeAmount, setPpblzStakeAmount] = useState(null);
    const [ppblzStakedAmount, setPpblzStakedAmount] = useState(0);
    const [uniV2PpblzStakeAmount, setUniV2PpblzStakeAmount] = useState(null);
    const [uniV2PpblzStakedAmount, setUniV2PpblzStakedAmount] = useState(0);
    const [isApprovedPpblz, setIsApprovedPpblz] = useState(false);
    const [isApprovingPpblz, setIsApprovingPpblz] = useState(false);
    const [isApprovedUniV2Ppblz, setIsApprovedUniV

import { keyframes } from 'styled-components';

export const growDown = keyframes`
    0% {
        transform: scaleY(0)
    } 
    80% {
        transform: scaleY(1.1)
    }
    100% {
        transform: scaleY(1)
    }
`;

export const lineAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

export const load = keyframes`
        0% {
            height: 5px;
            bottom: 0;
            opacity: 1;
        }

        25% {
            opacity: 0.3;
            bottom: 0;
            height: 15px;
        }

        50% {
            opacity: 1;
            height: 5px;
            bottom: calc(100% - 5px);
        }

        75% {
            opacity: 0.3;
            height: 15px;
            bottom: 0;
        }

        100% {
            opacity: 1;
            height: 5px;
            bottom: 0;
        }
`;

export const spin = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`;

export const growWidth = keyframes`
   0% {
       width:0;
   }
   100% {
       width: 100%;
   }
`;

export const growHeight = keyframes`
   0% {
       height:0;
   }
   50% {
       height: 100%;
   }
   100% {
       height: 0;
   }
`;

export const loadSpin = keyframes`
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
`;

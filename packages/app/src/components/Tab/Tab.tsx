import styled from 'styled-components';

const Tabs = styled.div`
  /* Custom styles for Tabs component */
`;

const TabList = styled.div`
  display: flex;
  gap: 1rem;
  background-color: #f0f0f0;
  padding: 0.5rem;
`;

const Tab = styled.div<{ isActive: boolean }>`
  flex-basis: 50%; /* Set equal width for two tabs */
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: transparent;
  color: ${(props) => (props.isActive ? '#333' : '#888')};
  transition: color 0.3s ease;
  text-align: center;
  position: relative;

  &:hover {
    color: #333;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: ${(props) => (props.isActive ? '2px' : '0')};
    background-color: #007bff;
    transition: height 0.3s ease;
  }
`;


const TabPanels = styled.div`
  /* Custom styles for TabPanels component */
`;

const TabPanel = styled.div<{ isActive: boolean }>`
  display: ${(props) => (props.isActive ? 'block' : 'none')};
  /* Custom styles for TabPanel component */
`;

const Input = styled.input`
  /* Custom styles for Input component */
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Box = styled.div`
  /* Custom styles for Box component */
  margin-bottom: 1rem;
`;

const Text = styled.div`
  /* Custom styles for Text component */
  font-weight: bold;
`;

const Stack = styled.div`
  /* Custom styles for Stack component */
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Web3Button = styled.button`
  /* Custom styles for Web3Button component */
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Input,
  Box,
  Text,
  Stack,
  Web3Button,
};

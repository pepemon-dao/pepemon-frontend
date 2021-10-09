import React, { useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks';
import styled from 'styled-components'
import { Check, ChevronDown } from '../../assets';

interface DropDownMenuProps {
    title: any;
    options: {
        title: string,
        onClick: () => void,
    }[];
    activeOptions: string;
    style?: any;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({title, options, activeOptions, style}) => {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const onClick = () => setIsActive(!isActive);

    useOutsideClick(dropdownRef, () => {
        if (isActive) {
            setIsActive(!isActive);
        }
    })

    const activeOptionsArr = activeOptions.split('|').filter(Boolean);

    const editedTitle = activeOptionsArr.length === 0 ? title :
        activeOptionsArr.length === options.length ? 'all' :
        activeOptionsArr.length > 1 ? activeOptionsArr.length + ' Selected' :
        activeOptionsArr[0];

    return (
        <StyledMenuContainer>
            <StyledMenuTrigger onClick={onClick} width={style ? style.width : null} bgColor={style ? style.bgColor : null}>
                <span onClick={onClick}>{editedTitle}</span>
                <ChevronDown/>
            </StyledMenuTrigger>
            <StyledMenu active={isActive} ref={dropdownRef}>
                {(options.length > 1 || (options.length === 1 && title !== options[0].title)) &&
                <StyledList>
                    {options.map((option, key) => {
                        const active = activeOptionsArr.includes(option.title);
                        return (
                        <StyledListItem key={key}>
                            <StyledListItemLink className={active ? "active" : ""} onClick={() => {
                                option.onClick();
                                setIsActive(false);
                                }}>
                                {active && <Check/>}
                                <span>{option.title}</span>
                            </StyledListItemLink>
                        </StyledListItem>)
                    })}
                </StyledList>
                }
            </StyledMenu>
        </StyledMenuContainer>
    );
};

interface StyledMenuProps {
    active: boolean
}

interface StyledProps {
    width?: string;
    bgColor?: string;
}

const StyledMenuContainer = styled.div`
    position: relative;
    z-index: 2;
`

const StyledMenuTrigger = styled.button<StyledProps>`
    background: ${(props) => props.bgColor ? props.bgColor : props.theme.color.white};
    border-radius: 1em;
    color: ${props => props.theme.color.purple[600]};
    cursor: pointer;
    display: flex;
    font-family: ${props => props.theme.font.spaceMace};
    font-size: 0.625rem;
    justify-content: center;
    align-items: center;
    padding: .8em 1.2em;
    text-align: center;
    text-transform: uppercase;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.0);
    border: 2px solid ${props => props.theme.color.purple[600]};
    vertical-align: middle;
    transition: box-shadow 0.4s ease;

    &:hover {
       box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    }

    svg {
        height: 1em;
        width: 1em;
        margin-left: .7em
    }
`

const StyledMenu = styled.div<StyledMenuProps>`
  z-index: 99;
  background: ${(props) => props.theme.color.white};
  position: absolute;
  top: 3.5em;
  right: 0;
  opacity: ${(props) => props.active ? 1 : 0};
  visibility: ${(props) => props.active ? 'visible' : 'hidden'};
  transform: ${(props) => props.active ? 'translateY(0)' : 'translateY(-20px)'};
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  font-size: 1rem;
  border-radius: 1em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12);
  border: solid 1px ${props => props.theme.color.purple[600]};
  width: 18.75em;

  &:before {
      content: "";
      display: inline-block;
      background-color: ${props => props.theme.color.white};
      height: 1em;
      width: 1em;
      transform: rotate(45deg) translateY(-50%);
      position: absolute;
      right: 2.5em;
      border-color: ${props => props.theme.color.purple[600]};
      transform-origin: top;
      border-left-style: solid;
      border-top-style: solid;
      border-top-width: 1px;
      border-left-width: 1px;
`

const StyledList = styled.ul`
  list-style: none;
  padding: 1em 2.75em;
  margin: 0;
  position: relative;
`

const StyledListItem = styled.li``

const StyledListItemLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: ${props => props.theme.color.gray[500]};
  padding: .5em 0;
  display: flex;
  align-items: center;

  &:hover {
      color: ${props => props.theme.color.purple[600]};
  }

  svg {
      left: 1em;
      height: 1em;
      width: 1em;
      position: absolute;
  }

  &.active {
      color: ${props => props.theme.color.purple[600]};
      font-weight: bold;
  }
`

export default DropDownMenu

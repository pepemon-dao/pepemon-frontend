import styled from 'styled-components'

interface StyledTitleProps {
	as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	inactive?: boolean;
	size?: string;
	font?: string;
}

const StyledTitle = styled.div<StyledTitleProps>`
	&{
		color: ${props => props.color ? props.color : props.theme.color.black};
		font-family: ${props => props.font && props.font};
		font-size: ${props => props.size && props.size};
		font-weight: 500;
		position: relative;
		hyphens: none;
		margin: 0;
		opacity: ${props => ! props.inactive ? 1 : .7};
	}

	&:not(:last-child) {
		margin-right: 1em;
	}

	a {
		color: currentColor;
		text-decoration: none;
	}

	${({ inactive }) => !inactive && `
	  &{
		font-weight: 900;
	  }

      a:before {
        // content: "";
		background-color: currentColor;
		display: inline-block;
		position: absolute;
		height: 2px;
		width: 100%;
		bottom: -.1em;
		left: 0;
      }
    `}
`

export default StyledTitle;

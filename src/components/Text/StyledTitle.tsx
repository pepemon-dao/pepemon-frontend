import styled from 'styled-components'

interface StyledTitleProps {
	as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	align?: string;
	inactive?: boolean;
	size?: string;
	font?: string;
	weight?: number;
}

const StyledTitle = styled.div<StyledTitleProps>`
	&{
		color: ${props => props.color ? props.color : props.theme.color.black};
		font-family: ${props => props.font ? props.font : props.theme.font.spaceMace};
		font-size: ${props => props.size && props.size};
		font-weight: ${props => props.weight ? props.weight : 500};
		position: relative;
		hyphens: none;
		margin: 0;
		opacity: ${props => ! props.inactive ? 1 : .7};
		text-align: ${props => props.align && props.align};
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
		// font-weight: 900;
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

export const StyledPageTitle = styled(StyledTitle)`
	font-size: 2.5rem;
	margin-bottom: .5em;
`

export default StyledTitle;

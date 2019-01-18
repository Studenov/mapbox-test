import styled from 'styled-components';
import { createStyles } from '@material-ui/core/styles';

export const BlockMap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const styles = () => createStyles({
  root: {
    height: 250,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
    zIndex: 1,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: 5,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: 20 * 2,
  },
  input: {
    padding: '10px 20px'
  },
  papper: {
    position: 'relative',
    zIndex: 1
  }
});
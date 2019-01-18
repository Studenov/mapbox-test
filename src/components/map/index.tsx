import React from 'react';
import MapBox from 'mapbox-gl/dist/mapbox-gl';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import { token } from '../../config';
import { CombineReducers } from '../../store/store';
import { searchPlace, SearchPlace, clearSearchList, ClearSearchList } from '../../store/actions/actions';
import * as Styled from './styles/styles';

MapBox.accessToken = token;

type Props = {
  places: [
    {
      place_name?: string,
      center?: Array<Number>
    }?
  ],
  searchPlaceToMapBox: (value: string) => void,
  clearList: () => void,
  classes: {
    root: string,
    container: string,
    suggestionsContainerOpen: string,
    suggestion: string,
    suggestionsList: string,
    divider: string,
    input: string,
    papper: string
  }
}
type State = {
  latitude: number,
  longitude: number,
  zoom: number,
  value: string
}
type Value = {
  newValue: string
}
type DispatchActions = {
  type: SearchPlace | ClearSearchList
}
type AutosuggestHighlight = {
  query: string,
  isHighlighted: boolean
}

export class Homepage extends React.Component<Props, State> {
  public map: any;
  public popperNode: React.Ref<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.popperNode = React.createRef();
    this.state = {
      value: '',
      latitude: 0,
      longitude: 0,
      zoom: 1
    }
  }

  componentDidMount() {
    const { latitude, longitude, zoom } = this.state;
    this.map = new MapBox.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [longitude, latitude],
      zoom
    });
    this.map.on('move', () => {
      const { lng, lat } = this.map.getCenter();
      this.setState({ latitude: lat.toFixed(4), longitude: lng.toFixed(4), zoom: this.map.getZoom().toFixed(2) });
    })
  }

  onChange = (event: any, { newValue: value }: Value) => this.setState({ value });

  renderSuggestionsContainer = (options: any) => (
    <Paper {...options.containerProps} square>
      {options.children}
    </Paper>
  );

  renderInputComponent = (inputProps: any) => {
    const { inputRef = () => {}, ref, ...other } = inputProps;
    const { classes } = this.props;
    return (
    <TextField
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        }
      }}
      {...other}
      fullWidth
    />
    );
  }

  renderSuggestion = (suggestion: any, { query, isHighlighted }: AutosuggestHighlight) => {
    const matches = match(suggestion.place_name, query);
    const parts = parse(suggestion.place_name, matches);
    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part: any, index: number) => {
            return part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            );
          })}
        </div>
      </MenuItem>
    );
  };

  getSuggestionValue = (suggestion: any) => suggestion.place_name;

  onSuggestionSelected = (event: any, { suggestion }: any) => {
    if (this.popperNode instanceof HTMLElement) {
      this.popperNode.blur();
    }
    this.map.flyTo({ center: suggestion.center, zoom: 10 });
  }

  onSuggestionsFetchRequested = ({ value }: any) => {
    const { searchPlaceToMapBox } = this.props;
    searchPlaceToMapBox(value);
  };

  onSuggestionsClearRequested = () => {
    const { clearList } = this.props;
    clearList();
  }

  render() {
    const { places, classes } = this.props;
    const { value } = this.state;
    const inputProps = {
      placeholder: 'Search to find place',
      value,
      onChange: this.onChange,
      inputRef: (node: React.Ref<HTMLInputElement>) => this.popperNode = node,
    };
    return (
      <React.Fragment>
        <Paper className={classes.papper}>
          <Autosuggest
            theme={{
              container: classes.container,
              suggestionsContainerOpen: classes.suggestionsContainerOpen,
              suggestionsList: classes.suggestionsList,
              suggestion: classes.suggestion,
            }}
            suggestions={places}
            onSuggestionSelected={this.onSuggestionSelected}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderInputComponent={this.renderInputComponent}
            renderSuggestion={this.renderSuggestion}
            renderSuggestionsContainer={this.renderSuggestionsContainer}
            inputProps={inputProps}
          />
        </Paper>
        <Styled.BlockMap id="map-container" />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (store: CombineReducers) => ({
  places: store.searchData.places
});

const mapActionsToProps = (dispatch: Dispatch<DispatchActions>) => bindActionCreators({
  searchPlaceToMapBox: searchPlace,
  clearList: clearSearchList
}, dispatch);

export const HomepageConnect = withStyles(Styled.styles)(connect(mapStateToProps, mapActionsToProps)(Homepage)); 
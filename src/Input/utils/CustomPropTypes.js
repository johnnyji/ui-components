import ImmutablePropTypes from 'react-immutable-proptypes';
import {PropTypes} from 'react';

export default {

  errorMatcher: ImmutablePropTypes.mapContains({
    error: PropTypes.string.isRequired,
    regex: PropTypes.func.isRequired
  })

};
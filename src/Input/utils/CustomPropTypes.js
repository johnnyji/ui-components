import {PropTypes} from 'react';

export default {

  errorMatcher: PropTypes.shape({
    error: PropTypes.string.isRequired,
    validator: PropTypes.func.isRequired
  })

};

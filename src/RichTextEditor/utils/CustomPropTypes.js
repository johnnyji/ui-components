import ImmutablePropTypes from 'react-immutable-proptypes';
import {PropTypes} from 'react';

export default {

  decorators: ImmutablePropTypes.listOf(
    PropTypes.shape({
      component: PropTypes.func.isRequired,
      strategy: PropTypes.func.isRequired
    })
  )

};
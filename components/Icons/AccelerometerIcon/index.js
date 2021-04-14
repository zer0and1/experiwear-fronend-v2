import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SvgIcon from '@material-ui/core/SvgIcon'
import clsx from 'clsx'

const useStyles = makeStyles(() => ({
  root: {
    width: 18
  }
}))

const AccelerometerIcon = ({ isActive = false, className, viewBox, ...rest }) => {
  const classes = useStyles()
  const color = isActive ? '#01a1c3' : '#606060'

  return (
    <SvgIcon viewBox={viewBox || '0 0 60 60'} {...rest} className={clsx(classes.root, className)}>
      <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="accelerometer" transform="translate(0.000000, 6.000000)" fill={color} fillRule="nonzero">
          <path
            d="M40.8669338,22 L36.1225068,22 C34.8739734,22 34,23 34,24.125 L34,28.875 C34,30.125 34.9988267,31 36.1225068,31 L40.8669338,31 C42.1154672,31 42.9894406,30 42.9894406,28.875 L42.9894406,24.125 C43.114294,23 42.1154672,22 40.8669338,22 Z"
            id="Path"/>
          <path
            d="M57.9855642,36.3598435 C56.7331762,36.3598435 55.8565046,37.3611473 55.8565046,38.4876141 L55.8565046,40.6153846 L49.8450422,34.7327249 C50.3459974,33.7314211 50.596475,32.6049544 50.596475,31.4784876 L50.596475,21.2151239 C50.596475,17.3350717 47.465505,14.0808344 43.4578634,14.0808344 L40.577371,14.0808344 L40.577371,7.3220339 L42.2054754,8.82398957 C42.5811918,9.19947849 43.2073858,9.44980443 43.708341,9.44980443 C44.334535,9.44980443 44.8354902,9.19947849 45.3364454,8.82398957 C46.213117,7.94784876 46.0878782,6.57105606 45.2112066,5.69491525 L39.8259382,0.563233377 C38.9492666,-0.187744459 37.6968786,-0.187744459 36.820207,0.563233377 L31.4349387,5.69491525 C30.5582671,6.57105606 30.5582671,7.94784876 31.3096999,8.82398957 C32.1863715,9.70013038 33.5639983,9.70013038 34.4406699,8.94915254 L36.0687742,7.44719687 L36.0687742,14.2059974 L33.1882819,14.2059974 C29.3058791,14.2059974 26.0496703,17.3350717 26.0496703,21.3402868 L26.0496703,24.2190352 L7.38908917,24.2190352 L8.89195476,22.5919166 C9.76862636,21.7157757 9.64338756,20.3389831 8.76671596,19.4628422 C7.89004437,18.5867014 6.51241757,18.7118644 5.63574598,19.5880052 L0.626193997,24.8448501 C0.626193997,24.8448501 0.500955198,24.970013 0.500955198,24.970013 C0.500955198,24.970013 0.375716398,25.095176 0.375716398,25.095176 C0.375716398,25.220339 0.250477599,25.220339 0.250477599,25.345502 C0.250477599,25.345502 0.125238799,25.4706649 0.125238799,25.4706649 C0.125238799,25.5958279 0.125238799,25.5958279 0,25.7209909 C0,25.7209909 0,25.8461538 0,25.8461538 C0,26.0964798 0,26.4719687 0,26.7222947 C0,26.7222947 0,26.8474576 0,26.8474576 C0,26.9726206 0,26.9726206 0.125238799,27.0977836 C0.125238799,27.0977836 0.125238799,27.2229465 0.250477599,27.2229465 C0.250477599,27.3481095 0.375716398,27.3481095 0.375716398,27.4732725 C0.375716398,27.4732725 0.500955198,27.5984355 0.500955198,27.5984355 C0.500955198,27.5984355 0.626193997,27.7235984 0.626193997,27.7235984 L5.76098478,33.1056063 C6.13670117,33.6062581 6.76289517,33.7314211 7.38908917,33.7314211 C7.89004437,33.7314211 8.51623836,33.4810952 8.89195476,33.1056063 C9.76862636,32.2294654 9.76862636,30.8526728 9.01719356,29.9765319 L7.38908917,28.5997392 L26.3001479,28.5997392 L26.3001479,31.4784876 C26.3001479,35.3585398 29.4311179,38.6127771 33.4387595,38.6127771 L43.5831022,38.6127771 C44.7102514,38.6127771 45.8374006,38.3624511 46.7140722,37.8617992 L52.6002958,43.7444589 L50.4712362,43.7444589 C49.2188482,43.7444589 48.3421766,44.7457627 48.3421766,45.8722295 C48.3421766,46.9986962 49.344087,48 50.4712362,48 L57.8603254,48 C59.1127133,48 59.9893849,46.9986962 59.9893849,45.8722295 L59.9893849,38.6127771 C60.1146237,37.3611473 59.1127133,36.3598435 57.9855642,36.3598435 Z M33.4387595,34.232073 C31.9358939,34.232073 30.6835059,32.9804433 30.6835059,31.4784876 L30.6835059,21.2151239 C30.6835059,19.7131682 31.9358939,18.4615385 33.4387595,18.4615385 L43.5831022,18.4615385 C45.0859678,18.4615385 46.3383558,19.7131682 46.3383558,21.2151239 L46.3383558,31.4784876 C46.3383558,32.9804433 45.0859678,34.232073 43.5831022,34.232073 L33.4387595,34.232073 Z"
            id="Shape"/>
        </g>
      </g>
    </SvgIcon>
  )
}

export default memo(AccelerometerIcon)

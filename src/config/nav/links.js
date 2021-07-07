import {
  HomeIconOutlined,
  HomeIconFilled
} from '../../components/shared/icons/HomeIcon'
import {
  BondIconOutlined,
  BondIconFilled
} from '../../components/shared/icons/BondIcon'
import {
  FarmIconOutlined,
  FarmIconFilled
} from '../../components/shared/icons/FarmIcon'
import {
  PredMktIconOutlined,
  PredMktIconFilled
} from '../../components/shared/icons/PredMktIcon'
import {
  InsuranceIconOutlined,
  InsuranceIconFilled
} from '../../components/shared/icons/InsuranceIcon'

const data = [
  {
    name: 'Home',
    path: '/',
    icon: HomeIconOutlined,
    activeIcon: HomeIconFilled
  },
  {
    name: 'Bond',
    path: '/bond',
    icon: BondIconOutlined,
    activeIcon: BondIconFilled
  },
  {
    name: 'Pool',
    path: '/pool',
    icon: FarmIconOutlined,
    activeIcon: FarmIconFilled
  },
  {
    name: 'Cover',
    path: '/cover',
    icon: InsuranceIconOutlined,
    activeIcon: InsuranceIconFilled
  },
  {
    name: 'Bridge',
    path: '/prediction-market',
    icon: PredMktIconOutlined,
    activeIcon: PredMktIconFilled
  }
]

export default data

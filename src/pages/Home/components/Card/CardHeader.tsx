import { HeaderContainer } from '../styled.component';

interface Props {
  tableNumber: number;
}

const CardHeader: React.FC<Props> = ({ tableNumber }) => <HeaderContainer>MESA: Num {tableNumber}</HeaderContainer>;

export default CardHeader;

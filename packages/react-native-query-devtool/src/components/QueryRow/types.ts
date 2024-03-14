import { QueryDevtoolData } from '../../types';

interface QueryRowProps {
  index: number;
  item: QueryDevtoolData;
  isSelected?: boolean;
  handleSelectedRow: (index: number) => void;
}

export default QueryRowProps;

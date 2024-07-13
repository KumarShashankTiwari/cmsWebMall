import React, { useEffect, useState } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import './index.scss';

const MultiSelectDropdown = ({
  label,
  name,
  value = [],
  onChange,
  options = [],
  id,
  tag_type = false,
  disable = false,
  asterisk=false,
}) => {
  const [selectedData, setSelectData] = useState([]);

  useEffect(() => {
    const data = [];
    let tempType = typeof value === 'string' ? false : true;
    if (value && tempType) {
      value?.length &&
        value?.length > 0 &&
        value?.forEach((item) => {
          options &&
            options?.forEach((itemTwo) => {
              if (
                item &&
                item.toLowerCase() ===
                  (itemTwo?.value && itemTwo?.value.toLowerCase())
              ) {
                data.push(itemTwo);
              }
            });
        });
      setSelectData(data);
    }
  }, [value, options]);

  const onSelectOrRemove = (e) => {
    let newArr = [];
    e &&
      e.forEach((item) => {
        newArr.push(item?.value);
      });
    onChange &&
      onChange({
        target: {
          id: id,
          name: name,
          value: newArr,
        },
      });
  };

  return (
    <div className='multiselectbox'>
      {label && <label>{label}{asterisk && <span>*</span>}</label>}

      <Multiselect
        options={options}
        selectedValues={selectedData}
        onSelect={onSelectOrRemove}
        onRemove={onSelectOrRemove}
        displayValue='name'
        value={selectedData}
        groupBy={tag_type ? 'tag_type' : ''}
        disable={disable}
      />
    </div>
  );
};

export default MultiSelectDropdown;

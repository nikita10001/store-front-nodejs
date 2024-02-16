import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminActions } from '../model/slice/adminSlice';
import cls from './Form.module.scss';
import { DeviceInfoList } from 'entities/Device';
import { classNames } from 'shared/lib/classNames';
import Button from 'shared/ui/button/Button';
import { Input } from 'shared/ui/input/Input';

export const InfoList = memo(({ list }) => {
  const dispatch = useDispatch();

  const [newItem, setNewItem] = useState({
    name: '',
    value: '',
  });

  const handleRemoveItem = (name) => {
    dispatch(
      adminActions.updateDevice({
        characteristics: [...list.filter((item) => item.name !== name)],
      })
    );
  };

  const handleAddItem = () => {
    if (!newItem.name.trim() || !newItem.value.trim()) {
      return;
    }
    dispatch(
      adminActions.updateDevice({
        characteristics: [
          ...list,
          {
            ...newItem,
          },
        ],
      })
    );
    setNewItem({
      name: '',
      value: '',
    });
  };

  return (
    <div className={cls.listBlock}>
      <DeviceInfoList //
        isEdit={true}
        handleRemoveItem={handleRemoveItem}
        className={cls.deviceInfoList}
        list={list}
      />
      <div className={cls.listItem}>
        <Input
          value={newItem.name}
          placeholder={'Название'}
          onChange={(value) =>
            setNewItem({
              ...newItem,
              name: value,
            })
          }
          className={cls.name}
        />
        <Input
          value={newItem.value}
          placeholder={'Значение'}
          onChange={(value) =>
            setNewItem({
              ...newItem,
              value: value,
            })
          }
        />
        <Button onClick={handleAddItem} className={classNames(cls.addBtn, {}, ['btn'])}>
          Добавить
        </Button>
      </div>
    </div>
  );
});

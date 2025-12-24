import React, { useEffect, useMemo, useState } from 'react';
import { View } from '@tarojs/components';
import { isNotNull } from '@/utils/util';
import './index.scss';

function Classify(props) {
  const { data = [], onClassifyCall = () => {} } = props;

  const [classifyList, setClassifyList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]); // 当前选择的分类数组
  const [activeId, setActiveId] = useState(0); // 当前点击的分类 id
  const [shadeVisible, setShadeVisible] = useState(0); // 子列表显示与否

  /**
   * @desc 分类选择
   * @param { number } id
   * @return { void }
   */
  const handleClassifySelected = (id) => {
    setActiveId(id);
    setShadeVisible(true);
  };

  /**
   * @desc 分类列表项点击事件
   * @param { object } e
   * @param { number } id
   * @param { string } title
   * @return { void }
   */
  const handleItemClick = (e, id, name) => {
    e.stopPropagation();

    setClassifyList(
      classifyList.map(v => v.id === activeId ? { id, name } : v)
    );

    setSelectedIds(
      selectedIds.filter(v => v !== activeId).concat(id)
    );

    setActiveId(id);
  };

  /**
   * @desc 分类列表取消
   * @param { object } e
   * @return { void }
   */
  const handleCancel = (e) => {
    e.stopPropagation();
    const index = classifyList.findIndex(v => v.id === activeId);
    setClassifyList([
      ...classifyList.slice(0, index),
      data[index], // 复原
      ...classifyList.slice(index + 1)
    ]);
    setSelectedIds(
      selectedIds.filter(v => v !== activeId)
    );
    setActiveId(0);
    setShadeVisible(false);
  };

  /**
   * @desc 分类列表确定
   * @param { object } e
   * @return { void }
   */
  const handleConfirm = (e) => {
    e.stopPropagation();

    onClassifyCall({ selectedIds });

    setShadeVisible(false);
    setActiveId(0);
  };

  const subClassifyList = useMemo(() => {
    if (!activeId) {
      return [];
    }
    const index = classifyList.findIndex(v => v.id === activeId);
    return data[index].children;
  }, [activeId, classifyList, data]);

  useEffect(() => {
    setClassifyList(data);
  }, [data]);

  return (
    <View className="classify">
      <View className="classify__selector">
        {classifyList.map((item) => (
          <View
            key={item.id}
            className={(activeId === item.id || selectedIds.includes(item.id)) ? 'classify__selector-item--active' : 'classify__selector-item'}
            onClick={() => handleClassifySelected(item.id)}
          >
            {item.name}
          </View>
        ))}
      </View>

      <View
        className="shade"
        style={{ display: shadeVisible ? 'block' : 'none' }}
        onClick={handleCancel}
      >
        <View className="classify-list clearfix">
          {subClassifyList.map((item) => (
            <View
              key={item.id}
              className={selectedIds.includes(item.id) ? 'classify-item--active' : 'classify-item'}
              onClick={(e) => handleItemClick(e, item.id, item.name)}
            >
              {item.name}
            </View>
          ))}

          <View className="btn-group">
            <View className="cancel-btn" onClick={handleCancel}>
              取消
            </View>
            <View className="submit-btn" onClick={handleConfirm}>
              确定
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Classify;

import { useEffect, useState } from 'react';

type Element = {
  id: string;
  element: string;
};

interface ElementSelector extends Element {
  isSelected: boolean;
}

export type { ElementSelector as ElementSelectorType };

type Props = {
  list: Element[];
  selected?: string;
};

const useSelect = ({ list, selected }: Props) => {
  const [listElements, setListElements] = useState<ElementSelector[]>(
    list.map((elem: Element, index) => {
      if (elem.id === selected) {
        return {
          ...elem,
          isSelected: true,
        };
      }

      if (index === 0 && !selected) {
        return {
          ...elem,
          isSelected: true,
        };
      }

      return {
        ...elem,
        isSelected: false,
      };
    })
  );

  useEffect(() => {
    setListElements((prev) => {
      if (list.length === 0) return [];

      // add
      if (list.length > prev.length) {
        const newList = list.map((elem, index) => ({
          ...elem,
          isSelected: list.length - 1 === index,
        }));

        return newList;
      }

      // delete
      if (prev.length > list.length) {
        const oldSelected = prev.find((elem) => elem.isSelected === true);
        if (!oldSelected) return prev;

        const newList = list.map((elem) => ({
          ...elem,
          isSelected: oldSelected.id === elem.id,
        }));

        if (newList.find((elem) => elem.isSelected === true)) return newList;

        let index = prev.findIndex((elem) => elem.id === oldSelected.id);
        if (!newList.at(index)) index -= 1;

        newList[index].isSelected = true;
        return newList;
      }

      return prev;
    });
  }, [list]);

  const select = (id: string) => {
    setListElements((prev) =>
      prev.map((element) => ({
        ...element,
        isSelected: element.id === id,
      }))
    );
  };

  return {
    list: listElements,
    select,
    selectedElement:
      listElements.find((element) => element.isSelected) ?? listElements[0],
  };
};

export default useSelect;

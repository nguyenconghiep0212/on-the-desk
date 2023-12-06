import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import IcDnD from "assests/icon/ic-dnd.svg";
import { Icon } from "@iconify/react";
import { Button, Input, Tooltip } from "antd";
import { deleteContact, editContact, addContact } from "api";

function Component({
  dndItems,
  setDndItems,
  editingContact,
  setEditingContact,
}) {
  const [warning, setWarning] = useState(false);
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    margin: `0 0 8px 0`,
    // styles we need to apply on draggables
    ...draggableStyle,
  });
  const getListStyle = (isDraggingOver) => ({
    background: "transparent",
    width: "100%",
  });
  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const reorderedItems = reorder(
      dndItems,
      result.source.index,
      result.destination.index
    );
    setDndItems(reorderedItems);
  }

  function updateContactBulk() {
    const index = dndItems.findIndex((e) => e.id === editingContact.id);
    const items = dndItems;
    if (index > -1) {
      items[index] = editingContact;
    }
    setDndItems([...items]);
    editingContact.children.forEach(async (e) => {
      const params = { ...e, contactId: e.id };
      await editContact(params);
    });
  }
  function setEditingContactBulk(contact, e) {
    const items = editingContact;
    const index = editingContact.children.findIndex((e) => e.id === contact.id);
    const item = editingContact.children.find((e) => e.id === contact.id);
    item.infoDetail = e;
    items.children[index] = item;
    setEditingContact({ ...items });
  }

  function handleDeleteContact(obj) {
    obj.children.forEach(async (e) => {
      if (e.children) {
        await deleteContact(e.id);
      } else {
        await deleteContact(e.id);
      }
    });
    setDndItems(dndItems.filter((e) => e.id !== obj.id));
  }

  async function handleAddContact(obj) {
    const params = {
      contacts: [
        {
          templateId: obj.templateId,
          nameContact: obj.nameContact,
        },
      ],
    };
    const res = await addContact(params);
    if (res) {
      dndItems
        .find((e) => e.nameContact === res.data[0].nameContact)
        .children.push(res.data[0]);
      setDndItems([...dndItems]);
    }
  }

  function editContactRender(contact, dndItem) {
    return (
      <div className="flex items-center justify-between space-x-2">
        {contact.typeContact === "social" && (
          <Input
            className={`${warning && "invalidate"} p-0`}
            bordered={false}
            value={contact.infoDetail}
            placeholder="Dán link"
            onChange={(e) => {
              setWarning(false);
              setEditingContactBulk(contact, e.target.value);
            }}
          />
        )}
        {contact.typeContact === "phone" && (
          <Input
            className={`${warning && "invalidate"} p-0`}
            bordered={false}
            value={contact.infoDetail}
            placeholder="Số điện thoại"
            onChange={(e) => {
              setWarning(false);
              setEditingContactBulk(contact, e.target.value);
            }}
          />
        )}
        {contact.typeContact === "bank" && (
          <div className="w-full space-y-3">
            <Input
              className={`${warning && "invalidate"} p-0`}
              bordered={false}
              value={contact.infoDetail ? contact.infoDetail.split("|")[0] : ""}
              placeholder="Tên tài khoản"
              onChange={(e) => {
                const name = e.target.value;
                const number = contact.infoDetail
                  ? contact.infoDetail.split("|")[1]
                  : "";
                if (name && number) setWarning(false);
                setEditingContactBulk(contact, name + "|" + number);
              }}
            />
            <Input
              className={`${warning && "invalidate"} p-0`}
              bordered={false}
              value={contact.infoDetail ? contact.infoDetail.split("|")[1] : ""}
              placeholder="Số tài khoản"
              onChange={(e) => {
                const name = contact.infoDetail
                  ? contact.infoDetail.split("|")[0]
                  : "";
                const number = e.target.value;
                if (name && number) setWarning(false);
                setEditingContactBulk(contact, name + "|" + number);
              }}
            />
          </div>
        )}
        <div className="w-6">
          <Icon
            className="cursor-pointer text-[16px] text-[#EB5757]"
            icon="tabler:trash"
            onClick={async () => {
              if (editingContact.children.length > 1) {
                await deleteContact(contact.id);
                const items = editingContact;
                items.children = editingContact.children.filter(
                  (e) => e.id !== contact.id
                );
                setEditingContact({ ...items });
              } else {
                handleDeleteContact(dndItem);
              }
            }}
          />
        </div>
      </div>
    );
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {dndItems.map((e, index) => (
              <Draggable key={e.id} draggableId={e.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    key={index}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {/* EDIT */}
                    <Tooltip
                      trigger="click"
                      placement="bottom"
                      title={
                        <div className="contact-tooltip w-[95vw] lg:w-[50vw] pr-2 pl-7 max-h-[50vh] overflow-auto">
                          {editingContact.children ? (
                            <div className="mt-2 space-y-3">
                              {editingContact.children.map((f, j) => {
                                return (
                                  <div>
                                    {j !== 0 ? (
                                      <div
                                        id="divider"
                                        className="flex items-center justify-center py-6"
                                      >
                                        <div className="w-2/3 border-t border-dashed border-primary-blue-medium"></div>
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                    {editContactRender(f, e)}
                                  </div>
                                );
                              })}

                              <div className="mt-5">
                                <div
                                  className="border-white border-dashed rounded-md cursor-pointer border-[1px] w-max p-1"
                                  onClick={() => {
                                    if (
                                      editingContact.children[
                                        editingContact.children.length - 1
                                      ].infoDetail
                                    ) {
                                      handleAddContact(editingContact);
                                    } else {
                                      setWarning(true);
                                    }
                                  }}
                                >
                                  <Icon
                                    className="w-[18px] h-[18px]"
                                    icon="tabler:plus"
                                  />
                                </div>
                              </div>
                              <div className="mt-2 text-right">
                                <Button
                                  className="gradient_btn"
                                  onClick={() => {
                                    if (
                                      editingContact.children[
                                        editingContact.children.length - 1
                                      ].infoDetail
                                    ) {
                                      updateContactBulk();
                                    } else {
                                      setWarning(true);
                                    }
                                  }}
                                >
                                  Lưu
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      }
                      arrow={false}
                    >
                      <div className="flex">
                        <div className="flex items-center justify-center w-6">
                          <img src={IcDnD} alt="IcDnD" />
                        </div>
                        <div
                          className="flex items-center justify-start w-full cursor-pointer h-9"
                          onClick={() => {
                            setEditingContact(
                              dndItems.find((f) => f.id === e.id)
                            );
                          }}
                        >
                          <div
                            className={`flex items-center justify-center w-10 h-[inherit] rounded-tl-md rounded-bl-md ${
                              e.keyContact === "phone"
                                ? "bg-[#01B634]"
                                : "bg-white"
                            }`}
                          >
                            <img
                              src={`${process.env.REACT_APP_BASE_IMG}${e.linkIcon}`}
                              alt="platform logo"
                            />
                          </div>
                          <div
                            className="flex items-center justify-start w-[calc(100%-40px)] h-[inherit] px-4 rounded-tr-md rounded-br-md"
                            style={{
                              backgroundColor: `${e.backgoundColor}`,
                            }}
                          >
                            <span className="text-white truncate">
                              {e.nameContact}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-center w-6">
                          <Icon
                            className="text-[#EB5757]"
                            icon="tabler:trash"
                            onClick={() => handleDeleteContact(e)}
                          />
                        </div>
                      </div>
                    </Tooltip>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default Component;

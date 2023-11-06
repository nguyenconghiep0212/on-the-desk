import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import IcDnD from "assests/icon/ic-dnd.svg";
import { Icon } from "@iconify/react";
import { Button, Input } from "antd";
import { deleteContact, editContact } from "api";

 function Component({
  dndItems,
  setDndItems,
  editingContact,
  setEditingContact,
  setContactList,
}) {
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
  async function updateContact() {
    const index = dndItems.findIndex((e) => e.id === editingContact.id);
    if (index > -1) {
      dndItems[index] = editingContact;
    }
    setDndItems(dndItems);
    setContactList(dndItems);
    await editContact(editingContact);
    setEditingContact({});
  }
  async function handleDeleteContact(id: string) {
    await deleteContact(id);
    setContactList(dndItems.filter((e) => e.id !== id));
    setDndItems(dndItems.filter((e) => e.id !== id));
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
                          dndItems.find((f) => f.id === e.id).isEdit = true;
                          setDndItems(dndItems);
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
                          onClick={() => handleDeleteContact(e.id)}
                        />
                      </div>
                    </div>

                    {/* EDIT */}
                    {editingContact.id === e.id ? (
                      <div className="my-3 space-y-3">
                        {editingContact.typeContact === "social" && (
                          <Input
                            className="p-0"
                            bordered={false}
                            value={editingContact.infoDetail}
                            placeholder="Dán link"
                            onChange={(e) =>
                              setEditingContact({
                                ...editingContact,
                                infoDetail: e.target.value,
                              })
                            }
                          />
                        )}
                        {editingContact.typeContact === "phone" && (
                          <Input
                            className="p-0"
                            bordered={false}
                            value={editingContact.infoDetail}
                            placeholder="Số điện thoại"
                            onChange={(e) =>
                              setEditingContact({
                                ...editingContact,
                                infoDetail: e.target.value,
                              })
                            }
                          />
                        )}
                        {editingContact.typeContact === "bank" && (
                          <div className="space-y-3">
                            <Input
                              className="p-0"
                              bordered={false}
                              value={
                                editingContact.infoDetail
                                  ? editingContact.infoDetail.split("|")[0]
                                  : ""
                              }
                              placeholder="Tên tài khoản"
                              onChange={(e) => {
                                const name = e.target.value;
                                const number = editingContact.infoDetail
                                  ? editingContact.infoDetail.split("|")[1]
                                  : "";
                                setEditingContact({
                                  ...editingContact,
                                  infoDetail: name + "|" + number,
                                });
                              }}
                            />
                            <Input
                              className="p-0"
                              bordered={false}
                              value={
                                editingContact.infoDetail
                                  ? editingContact.infoDetail.split("|")[1]
                                  : ""
                              }
                              placeholder="Số tài khoản"
                              onChange={(e) => {
                                const name = editingContact.infoDetail
                                  ? editingContact.infoDetail.split("|")[0]
                                  : "";
                                const number = e.target.value;
                                setEditingContact({
                                  ...editingContact,
                                  infoDetail: name + "|" + number,
                                });
                              }}
                            />
                          </div>
                        )}
                        <div className="mt-2 text-right">
                          <Button
                            className="gradient_btn"
                            onClick={() => updateContact()}
                          >
                            Xong
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
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
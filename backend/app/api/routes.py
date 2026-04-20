from typing import List

from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.todo import TodoCreate, TodoResponse, TodoUpdate
from app.services import todo as todo_service

router = APIRouter(prefix="/api/todos")


@router.get("", response_model=List[TodoResponse], status_code=200)
def list_todos(db: Session = Depends(get_db)):
    return todo_service.get_all_todos(db)


@router.post("", response_model=TodoResponse, status_code=201)
def create_todo(payload: TodoCreate, db: Session = Depends(get_db)):
    return todo_service.create_todo(db, payload)


@router.put("/{todo_id}", response_model=TodoResponse, status_code=200)
def update_todo(todo_id: int, payload: TodoUpdate, db: Session = Depends(get_db)):
    return todo_service.update_todo(db, todo_id, payload)


@router.delete("/{todo_id}", status_code=204)
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    todo_service.delete_todo(db, todo_id)
    return Response(status_code=204)

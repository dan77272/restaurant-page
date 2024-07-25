import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../lib/db';

// GET handler
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
  
    try {
      if (id) {
        const { rows } = await db.query('SELECT * FROM menu_items WHERE id = $1', [id]);
        if (rows.length === 0) {
          return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }
        return NextResponse.json(rows[0]);
      } else {
        const { rows } = await db.query('SELECT * FROM menu_items');
        return NextResponse.json(rows);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
      return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 });
    }
  }

// POST handler
export async function POST(request: NextRequest) {
  try {
    const { name, description, image_url, price } = await request.json();
    console.log(image_url)
    const newItem = await db.query(
      'INSERT INTO menu_items (name, description, image_url, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, image_url, price]
    );
    return NextResponse.json(newItem.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error adding menu item:', error);
    return NextResponse.json({ error: 'Failed to add menu item' }, { status: 500 });
  }
}

// PUT handler
export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateFields } = await request.json();
    const fields = Object.keys(updateFields).map((key, i) => `${key} = $${i + 1}`).join(', ');
    const values = Object.values(updateFields);
    values.push(id);
    const updatedItem = await db.query(
      `UPDATE menu_items SET ${fields} WHERE id = $${values.length} RETURNING *`,
      values
    );
    return NextResponse.json(updatedItem.rows[0], { status: 200 });
  } catch (error) {
    console.error('Error updating menu item:', error);
    return NextResponse.json({ error: 'Failed to update menu item' }, { status: 500 });
  }
}

// DELETE handler
export async function DELETE(request: NextRequest) {
    try {
      const { itemId } = await request.json();
      await db.query('DELETE FROM menu_items WHERE id = $1', [itemId]);
      return NextResponse.json({ message: 'Item deleted successfully' }, { status: 200 });
    } catch (error) {
      console.error('Error deleting menu item:', error);
      return NextResponse.json({ error: 'Failed to delete menu item' }, { status: 500 });
    }
  }

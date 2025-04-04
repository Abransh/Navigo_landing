import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, destination, travelDates, interests } = body;
    
    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required fields' },
        { status: 400 }
      );
    }
    
    // Here you would typically:
    // 1. Save the data to a database
    // 2. Send an email notification
    // 3. Add the subscriber to a CRM or mailing list
    
    console.log('Form submission received:', {
      name,
      email,
      phone,
      destination,
      travelDates,
      interests
    });
    
    // For now, we'll just return a success response
    return NextResponse.json({ 
      message: 'Form submitted successfully',
      data: { name, email, phone, destination, travelDates, interests }
    });
    
  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
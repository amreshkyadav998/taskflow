import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch project count
    const projectsResult = await sql`
      SELECT COUNT(*) as count
      FROM projects
      WHERE user_id = ${session.user.id}
    `;

    // Fetch task count
    const tasksResult = await sql`
      SELECT COUNT(*) as count
      FROM tasks t
      JOIN projects p ON t.project_id = p.id
      WHERE p.user_id = ${session.user.id}
    `;

    // Fetch team members count
    const teamMembersResult = await sql`
      SELECT COUNT(DISTINCT tm.user_id) as count
      FROM team_members tm
      JOIN projects p ON tm.project_id = p.id
      WHERE p.user_id = ${session.user.id}
    `;

    return NextResponse.json({
      projects: parseInt(projectsResult.rows[0].count),
      tasks: parseInt(tasksResult.rows[0].count),
      teamMembers: parseInt(teamMembersResult.rows[0].count),
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 
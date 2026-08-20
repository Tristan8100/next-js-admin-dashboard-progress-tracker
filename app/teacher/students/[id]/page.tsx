import StudentProgressPage from "@/features/users/components/student-progress-page";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function StudentPage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <StudentProgressPage studentId={id} />
  );
}
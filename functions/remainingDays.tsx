export default function remaingDays(dueDate: any): number {
    const now: any = new Date();
    const due: any = new Date(dueDate);
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}
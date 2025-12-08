// src/services/user.service.ts
const data = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Doe" }
];
    
export const userService = {
    getAll: () => data,
    getById: (id: string) => data.find((u) => u.id === id)
};
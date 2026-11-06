export interface Contact {
    id: string;
    name: string;
    phone: string;
    email: string;
}

export class ContactManager {
    private contacts: Map<string, Contact> = new Map();

    // Thêm liên hệ
    addContact(contact: Contact): void {
        if (this.contacts.has(contact.id)) {
            throw new Error("ID liên hệ đã tồn tại.");
        }

        this.contacts.set(contact.id, contact);
    }

    // Tìm liên hệ theo ID
    getContact(id: string): Contact | undefined {
        return this.contacts.get(id);
    }

    // Cập nhật liên hệ
    updateContact(
        id: string,
        updates: Partial<Omit<Contact, "id">>
    ): Contact {
        const contact = this.contacts.get(id);

        if (!contact) {
            throw new Error("Không tìm thấy liên hệ.");
        }

        const updatedContact: Contact = {
            ...contact,
            ...updates,
            id
        };

        this.contacts.set(id, updatedContact);

        return updatedContact;
    }

    // Xóa liên hệ
    deleteContact(id: string): boolean {
        return this.contacts.delete(id);
    }

    // Lấy toàn bộ danh bạ
    getAllContacts(): Contact[] {
        return Array.from(this.contacts.values());
    }

    // Tìm kiếm theo tên
    searchByName(name: string): Contact[] {
        const keyword = name.toLowerCase();

        return this.getAllContacts().filter(contact =>
            contact.name.toLowerCase().includes(keyword)
        );
    }
}
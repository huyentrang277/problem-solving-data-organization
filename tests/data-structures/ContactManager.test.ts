import { describe, it, expect, beforeEach } from "vitest";
import { ContactManager, Contact } from "../../src/data-structures/ContactManager";

describe("ContactManager", () => {
    let manager: ContactManager;

    const contact1: Contact = {
        id: "1",
        name: "Nguyen Van An",
        phone: "0901234567",
        email: "an@gmail.com"
    };

    const contact2: Contact = {
        id: "2",
        name: "Tran Thi Binh",
        phone: "0912345678",
        email: "binh@gmail.com"
    };

    beforeEach(() => {
        manager = new ContactManager();
    });

    it("thêm liên hệ thành công", () => {
        manager.addContact(contact1);

        expect(manager.getContact("1")).toEqual(contact1);
    });

    it("không cho phép ID trùng lặp", () => {
        manager.addContact(contact1);

        expect(() => manager.addContact(contact1)).toThrow(
            "ID liên hệ đã tồn tại."
        );
    });

    it("tìm liên hệ theo ID", () => {
        manager.addContact(contact1);

        expect(manager.getContact("1")).toEqual(contact1);
    });

    it("trả về undefined nếu không tìm thấy ID", () => {
        expect(manager.getContact("999")).toBeUndefined();
    });

    it("cập nhật thông tin liên hệ", () => {
        manager.addContact(contact1);

        const updated = manager.updateContact("1", {
            phone: "0987654321"
        });

        expect(updated.phone).toBe("0987654321");
        expect(updated.name).toBe("Nguyen Van An");
    });

    it("báo lỗi khi cập nhật liên hệ không tồn tại", () => {
        expect(() =>
            manager.updateContact("999", { name: "New Name" })
        ).toThrow("Không tìm thấy liên hệ.");
    });

    it("xóa liên hệ thành công", () => {
        manager.addContact(contact1);

        expect(manager.deleteContact("1")).toBe(true);
        expect(manager.getContact("1")).toBeUndefined();
    });

    it("trả về false khi xóa ID không tồn tại", () => {
        expect(manager.deleteContact("999")).toBe(false);
    });

    it("lấy toàn bộ danh bạ", () => {
        manager.addContact(contact1);
        manager.addContact(contact2);

        expect(manager.getAllContacts()).toHaveLength(2);
    });

    it("tìm kiếm liên hệ theo tên", () => {
        manager.addContact(contact1);
        manager.addContact(contact2);

        const result = manager.searchByName("nguyen");

        expect(result).toHaveLength(1);
        expect(result[0].id).toBe("1");
    });

    it("tìm kiếm không phân biệt chữ hoa và chữ thường", () => {
        manager.addContact(contact1);

        expect(manager.searchByName("NGUYEN")).toHaveLength(1);
    });

    it("trả về mảng rỗng khi không tìm thấy tên", () => {
        manager.addContact(contact1);

        expect(manager.searchByName("Le Van C")).toEqual([]);
    });
});
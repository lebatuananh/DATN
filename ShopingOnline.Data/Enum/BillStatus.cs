using System.ComponentModel;

namespace ShoppingOnline.Data.Enum
{
    public enum BillStatus
    {
        [Description("Đơn hàng mới")]
        New,

        [Description("Đang giao hàng")]
        InProgress,

        [Description("Hàng trả lại")]
        Returned,

        [Description("Huỷ đơn hàng")]
        Cancelled,

        [Description("Thành công")]
        Completed
    }
}
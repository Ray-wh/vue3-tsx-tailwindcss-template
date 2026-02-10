/**
 * 用户管理页面
 */
import { defineComponent, ref, onMounted } from 'vue';
import {
  api,
  type User,
  type CreateUserDto,
  type UpdateUserDto,
} from '@/core/api';
import { Message, Modal } from '@arco-design/web-vue';

export default defineComponent({
  name: 'users',
  setup() {
    const users = ref<User[]>([]);
    const loading = ref(false);
    const showModal = ref(false);
    const editModal = ref(false);
    const currentUser = ref<User | null>(null);

    // 表单数据
    const formData = ref<CreateUserDto>({
      username: '',
      password: '',
      email: '',
      phone: '',
      isAdmin: false,
    });

    // 获取用户列表
    const fetchUsers = async () => {
      loading.value = true;
      try {
        const data = await api.getUsers();
        users.value = data;
      } catch (error) {
        Message.error('获取用户列表失败');
        console.error(error);
      } finally {
        loading.value = false;
      }
    };

    // 创建用户
    const handleCreate = async () => {
      try {
        await api.createUser(formData.value);
        Message.success('用户创建成功');
        showModal.value = false;
        resetForm();
        await fetchUsers();
      } catch (error: any) {
        Message.error(error.response?.data?.message || '创建用户失败');
      }
    };

    // 更新用户
    const handleUpdate = async () => {
      if (!currentUser.value) return;
      try {
        const updateData: UpdateUserDto = {
          username: formData.value.username,
          email: formData.value.email,
          phone: formData.value.phone,
          isAdmin: formData.value.isAdmin,
        };
        await api.updateUser(currentUser.value.id, updateData);
        Message.success('用户更新成功');
        editModal.value = false;
        resetForm();
        await fetchUsers();
      } catch (error: any) {
        Message.error(error.response?.data?.message || '更新用户失败');
      }
    };

    // 删除用户
    const handleDelete = async (id: number) => {
      Modal.confirm({
        title: '确认删除',
        content: '确定要删除这个用户吗？',
        onOk: async () => {
          try {
            await api.deleteUser(id);
            Message.success('用户删除成功');
            await fetchUsers();
          } catch (error: any) {
            Message.error(error.response?.data?.message || '删除用户失败');
          }
        },
      });
    };

    // 打开创建用户弹窗
    const openCreateModal = () => {
      resetForm();
      showModal.value = true;
    };

    // 打开编辑用户弹窗
    const openEditModal = (user: User) => {
      currentUser.value = user;
      formData.value = {
        username: user.username,
        password: '',
        email: user.email,
        phone: user.phone || '',
        isAdmin: user.isAdmin,
      };
      editModal.value = true;
    };

    // 重置表单
    const resetForm = () => {
      formData.value = {
        username: '',
        password: '',
        email: '',
        phone: '',
        isAdmin: false,
      };
      currentUser.value = null;
    };

    // 关闭弹窗
    const handleClose = () => {
      showModal.value = false;
      editModal.value = false;
      resetForm();
    };

    onMounted(() => {
      fetchUsers();
    });

    return () => (
      <div class="p-6">
        <a-card>
          <div class="flex justify-between items-center mb-6">
            <a-typography-title heading={3}>用户管理</a-typography-title>
            <a-button type="primary" onClick={openCreateModal}>
              新建用户
            </a-button>
          </div>

          <a-table
            data={users.value}
            loading={loading.value}
            pagination={false}
            rowKey="id"
            columns={[
              { title: 'ID', dataIndex: 'id', key: 'id' },
              { title: '用户名', dataIndex: 'username', key: 'username' },
              { title: '邮箱', dataIndex: 'email', key: 'email' },
              { title: '手机号', dataIndex: 'phone', key: 'phone' },
              {
                title: '管理员',
                dataIndex: 'isAdmin',
                key: 'isAdmin',
                slotName: 'isAdmin',
              },
              {
                title: '状态',
                dataIndex: 'isActive',
                key: 'isActive',
                slotName: 'isActive',
              },
              {
                title: '创建时间',
                dataIndex: 'createdAt',
                key: 'createdAt',
                slotName: 'createdAt',
              },
              {
                title: '操作',
                key: 'action',
                width: 200,
                fixed: 'right' as const,
                slotName: 'action',
              },
            ]}
            v-slots={{
              isAdmin: ({ record }: any) => (record.isAdmin ? '是' : '否'),
              isActive: ({ record }: any) =>
                record.isActive ? '激活' : '未激活',
              createdAt: ({ record }: any) =>
                new Date(record.createdAt).toLocaleString('zh-CN'),
              action: ({ record }: any) => (
                <div class="flex gap-2">
                  <a-button
                    type="text"
                    size="small"
                    onClick={() => openEditModal(record)}
                  >
                    编辑
                  </a-button>
                  <a-button
                    type="text"
                    size="small"
                    status="danger"
                    onClick={() => handleDelete(record.id)}
                  >
                    删除
                  </a-button>
                </div>
              ),
            }}
          />
        </a-card>

        {/* 创建用户弹窗 */}
        <a-modal
          v-model:visible={showModal.value}
          title="新建用户"
          onOk={handleCreate}
          onCancel={handleClose}
          okText="确定"
          cancelText="取消"
        >
          <a-form model={formData.value} layout="vertical">
            <a-form-item label="用户名" field="username" required>
              <a-input
                v-model={formData.value.username}
                placeholder="请输入用户名"
              />
            </a-form-item>
            <a-form-item label="密码" field="password" required>
              <a-input-password
                v-model={formData.value.password}
                placeholder="请输入密码"
              />
            </a-form-item>
            <a-form-item label="邮箱" field="email" required>
              <a-input
                v-model={formData.value.email}
                placeholder="请输入邮箱"
              />
            </a-form-item>
            <a-form-item label="手机号" field="phone">
              <a-input
                v-model={formData.value.phone}
                placeholder="请输入手机号"
              />
            </a-form-item>
            <a-form-item label="管理员" field="isAdmin">
              <a-checkbox v-model={formData.value.isAdmin}>是管理员</a-checkbox>
            </a-form-item>
          </a-form>
        </a-modal>

        {/* 编辑用户弹窗 */}
        <a-modal
          v-model:visible={editModal.value}
          title="编辑用户"
          onOk={handleUpdate}
          onCancel={handleClose}
          okText="确定"
          cancelText="取消"
        >
          <a-form model={formData.value} layout="vertical">
            <a-form-item label="用户名" field="username" required>
              <a-input
                v-model={formData.value.username}
                placeholder="请输入用户名"
              />
            </a-form-item>
            <a-form-item label="邮箱" field="email" required>
              <a-input
                v-model={formData.value.email}
                placeholder="请输入邮箱"
              />
            </a-form-item>
            <a-form-item label="手机号" field="phone">
              <a-input
                v-model={formData.value.phone}
                placeholder="请输入手机号"
              />
            </a-form-item>
            <a-form-item label="管理员" field="isAdmin">
              <a-checkbox v-model={formData.value.isAdmin}>是管理员</a-checkbox>
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
    );
  },
});

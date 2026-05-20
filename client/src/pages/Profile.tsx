import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import BlockchainBackground from "../components/BlockchainBackground"

const Profile = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <section className="relative flex items-center justify-center w-full pt-[64px] pb-16 px-5 md:px-8 min-h-[calc(100vh-64px)] overflow-hidden">

      <BlockchainBackground />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto w-full bg-black/40 border border-border-default rounded-[20px] p-8 md:p-12">

        {/* Header */}
        <div className="mb-8 md:mb-10 text-center">
          <h1 className="text-white font-display font-bold text-[36px] md:text-[40px] lg:text-[44px] tracking-[2px] mb-4">
            Profile
          </h1>
          <p className="text-text-muted text-[16px]">
            Your account information
          </p>
        </div>

        {/* User Info */}
        <div className="space-y-6 mb-8">

          {/* Username */}
          <div className="border-b border-border-default pb-4">
            <p className="text-text-muted text-[13px] mb-2">Username</p>
            <p className="text-white text-[18px] font-medium">{user?.username}</p>
          </div>

          {/* Name */}
          <div className="border-b border-border-default pb-4">
            <p className="text-text-muted text-[13px] mb-2">Full Name</p>
            <p className="text-white text-[18px] font-medium">{user?.name}</p>
          </div>

          {/* Email */}
          <div className="border-b border-border-default pb-4">
            <p className="text-text-muted text-[13px] mb-2">Email</p>
            <p className="text-white text-[18px] font-medium">{user?.email}</p>
          </div>

          {/* Role */}
          <div className="border-b border-border-default pb-4">
            <p className="text-text-muted text-[13px] mb-2">Role</p>
            <p className="text-white text-[18px] font-medium capitalize">{user?.role}</p>
          </div>

        </div>

        {/* Actions */}
        <div className="space-y-4">

          {/* Admin Dashboard Link */}
          {isAdmin && (
            <button
              onClick={() => navigate('/admin-dash')}
              className="w-full text-[14px] md:text-[16px] text-brand/50 px-4 py-3 rounded-full border border-brand/50 transition-all duration-300 hover:border-brand hover:bg-brand/5"
            >
              Admin Dashboard
            </button>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full text-[14px] md:text-[16px] text-black bg-white px-4 py-3 rounded-full font-medium transition-all duration-300 hover:bg-white/90"
          >
            Logout
          </button>
        </div>

      </div>
    </section>
  );
};

export default Profile;